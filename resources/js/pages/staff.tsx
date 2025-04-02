// resources/js/Pages/staff.tsx
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Staff {
    id: number;
    fileNumber: string;
    surname: string;
    firstName: string;
    lastName: string;
    otherNames: string;
    dateOfBirth: string;
    gender: string;
    stateOfOrigin: string;
    lgaOfOrigin: string;
    dateOfFirstAppointment: string;
    dateOfPresentAppointment: string;
    dateOfConfirmation: string;
    cadre: string;
    accountNumber: string;
    bankId: string;
    PFANumber: string;
    PFA: string;
    NHFNumber: string;
    HISNumber: string;
    HIS: string;
    dba: string;
    status: string;
}

interface Cadre {
    cadreId: number;
    cadreName: string;
}

interface Dba {
    dbaId: number;
    dbaName: string;
}

interface Props {
    staff: Staff[];
    cadres: Cadre[];
    dbas: Dba[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Staff',
        href: '/staff',
    },
];

export default function Staff({ staff, cadres, dbas }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null); // New state for summary
    const [currentStep, setCurrentStep] = useState(1);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        fileNumber: '',
        surname: '',
        firstName: '',
        lastName: '',
        otherNames: '',
        dateOfBirth: '',
        gender: '',
        stateOfOrigin: '',
        lgaOfOrigin: '',
        dateOfFirstAppointment: '',
        dateOfPresentAppointment: '',
        dateOfConfirmation: '',
        cadre: '',
        accountNumber: '',
        bankId: '',
        PFANumber: '',
        PFA: '',
        NHFNumber: '',
        HISNumber: '',
        HIS: '',
        dba: '',
        status: '',
    });

    const totalSteps = 3;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            return;
        }

        if (editingStaff) {
            put(`/staff/${editingStaff.staffId}`, { // Fixed staffId to id
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingStaff(null);
                    setCurrentStep(1);
                    reset();
                }
            });
        } else {
            post('/staff', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setCurrentStep(1);
                    reset();
                }
            });
        }
    };

    const handleEdit = (staff: Staff) => {
        setEditingStaff(staff);
        setData({
            fileNumber: staff.fileNumber || '',
            surname: staff.surname || '',
            firstName: staff.firstName || '',
            lastName: staff.lastName || '',
            otherNames: staff.otherNames || '',
            dateOfBirth: staff.dateOfBirth || '',
            gender: staff.gender || '',
            stateOfOrigin: staff.stateOfOrigin || '',
            lgaOfOrigin: staff.lgaOfOrigin || '',
            dateOfFirstAppointment: staff.dateOfFirstAppointment || '',
            dateOfPresentAppointment: staff.dateOfPresentAppointment || '',
            dateOfConfirmation: staff.dateOfConfirmation || '',
            cadre: staff.cadre || '',
            accountNumber: staff.accountNumber || '',
            bankId: staff.bankId || '',
            PFANumber: staff.PFANumber || '',
            PFA: staff.PFA || '',
            NHFNumber: staff.NHFNumber || '',
            HISNumber: staff.HISNumber || '',
            HIS: staff.HIS || '',
            dba: staff.dba || '',
            status: staff.status || '',
        });
        setCurrentStep(1);
        setIsModalOpen(true);
    };

    const handleViewSummary = (staff: Staff) => {
        setSelectedStaff(staff); // Set the selected staff for summary
        setIsSummaryModalOpen(true);
    };

    const handleDelete = (staffId: number) => {
        if (confirm('Are you sure you want to delete this staff record?')) {
            destroy(`/staff/${staffId}`);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">File Number</label>
                            <input
                                type="text"
                                value={data.fileNumber}
                                onChange={(e) => setData('fileNumber', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.fileNumber && <p className="mt-1 text-sm text-red-600">{errors.fileNumber}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Surname</label>
                            <input
                                type="text"
                                value={data.surname}
                                onChange={(e) => setData('surname', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                            <input
                                type="text"
                                value={data.firstName}
                                onChange={(e) => setData('firstName', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
                            <input
                                type="date"
                                value={data.dateOfBirth}
                                onChange={(e) => setData('dateOfBirth', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                            <select
                                value={data.gender}
                                onChange={(e) => setData('gender', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Appointment Details</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of First Appointment</label>
                            <input
                                type="date"
                                value={data.dateOfFirstAppointment}
                                onChange={(e) => setData('dateOfFirstAppointment', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Present Appointment</label>
                            <input
                                type="date"
                                value={data.dateOfPresentAppointment}
                                onChange={(e) => setData('dateOfPresentAppointment', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cadre</label>
                            <select
                                value={data.cadre}
                                onChange={(e) => setData('cadre', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Cadre</option>
                                {cadres.map((cadre) => (
                                    <option key={cadre.cadreId} value={cadre.cadreId}>
                                        {cadre.cadreName} - {cadre.step}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">DBA</label>
                            <select
                                value={data.dba}
                                onChange={(e) => setData('dba', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select DBA</option>
                                {dbas.map((dba) => (
                                    <option key={dba.dbaId} value={dba.dbaId}>
                                        {dba.dbaName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Financial Information</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Number</label>
                            <input
                                type="text"
                                value={data.accountNumber}
                                onChange={(e) => setData('accountNumber', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PFA Number</label>
                            <input
                                type="text"
                                value={data.PFANumber}
                                onChange={(e) => setData('PFANumber', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NHF Number</label>
                            <input
                                type="text"
                                value={data.NHFNumber}
                                onChange={(e) => setData('NHFNumber', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">HIS Number</label>
                            <input
                                type="text"
                                value={data.HISNumber}
                                onChange={(e) => setData('HISNumber', e.target.value)}
                                className="block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderSummary = () => {
        if (!selectedStaff) return null; // Safety check
        return (
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Staff Summary</h3>
                <div>
                    <p><strong>File Number:</strong> {selectedStaff.fileNumber || 'N/A'}</p>
                    <p><strong>Surname:</strong> {selectedStaff.surname || 'N/A'}</p>
                    <p><strong>First Name:</strong> {selectedStaff.firstName || 'N/A'}</p>
                    <p><strong>Last Name:</strong> {selectedStaff.lastName || 'N/A'}</p>
                    <p><strong>Other Names:</strong> {selectedStaff.otherNames || 'N/A'}</p>
                    <p><strong>Date of Birth:</strong> {selectedStaff.dateOfBirth || 'N/A'}</p>
                    <p><strong>Gender:</strong> {selectedStaff.gender || 'N/A'}</p>
                    <p><strong>State of Origin:</strong> {selectedStaff.stateOfOrigin || 'N/A'}</p>
                    <p><strong>LGA of Origin:</strong> {selectedStaff.lgaOfOrigin || 'N/A'}</p>
                    <p><strong>Date of First Appointment:</strong> {selectedStaff.dateOfFirstAppointment || 'N/A'}</p>
                    <p><strong>Date of Present Appointment:</strong> {selectedStaff.dateOfPresentAppointment || 'N/A'}</p>
                    <p><strong>Date of Confirmation:</strong> {selectedStaff.dateOfConfirmation || 'N/A'}</p>
                    <p><strong>Cadre:</strong> {cadres.find(c => c.id === parseInt(selectedStaff.cadre))?.name || 'N/A'}</p>
                    <p><strong>Account Number:</strong> {selectedStaff.accountNumber || 'N/A'}</p>
                    <p><strong>Bank ID:</strong> {selectedStaff.bankId || 'N/A'}</p>
                    <p><strong>PFA Number:</strong> {selectedStaff.PFANumber || 'N/A'}</p>
                    <p><strong>PFA:</strong> {selectedStaff.PFA || 'N/A'}</p>
                    <p><strong>NHF Number:</strong> {selectedStaff.NHFNumber || 'N/A'}</p>
                    <p><strong>HIS Number:</strong> {selectedStaff.HISNumber || 'N/A'}</p>
                    <p><strong>HIS:</strong> {selectedStaff.HIS || 'N/A'}</p>
                    <p><strong>DBA:</strong> {dbas.find(d => d.dbaId === parseInt(selectedStaff.dba))?.dbaName || 'N/A'}</p>
                    <p><strong>Status:</strong> {selectedStaff.status || 'N/A'}</p>
                </div>
            </div>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Staff Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 relative">
                <div className="mb-4">
                    <button
                        onClick={() => {
                            setEditingStaff(null);
                            reset();
                            setCurrentStep(1);
                            setIsModalOpen(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add Staff
                    </button>
                </div>

                {/* Table */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        File Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Staff Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {staff.map((org) => (
                                    <tr 
                                        key={org.staffId}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-900"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            {org.staffId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            {org.fileNumber}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            {org.surname} {org.firstName} {org.otherNames}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            {org.status}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleViewSummary(org)}
                                                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                                                    title="View Summary"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(org)}
                                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                    title="Edit"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(org.staffId)}
                                                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                    title="Delete"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Main Form Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto relative">
                            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                                    {editingStaff ? 'Edit Staff' : 'Add New Staff'}
                                </h2>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {/* Step Indicator */}
                            <div className="flex justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                                {[1, 2, 3].map((step) => (
                                    <div
                                        key={step}
                                        className={`flex-1 text-center text-sm sm:text-base ${
                                            step === currentStep
                                                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        Step {step}
                                    </div>
                                ))}
                            </div>

                            {/* Scrollable Form Content */}
                            <form onSubmit={handleSubmit}>
                                <div className="max-h-[50vh] overflow-y-auto p-4">
                                    {renderStep()}
                                </div>

                                {/* Buttons */}
                                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between gap-3">
                                    {currentStep > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(currentStep - 1)}
                                            className="w-full sm:w-auto px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
                                        >
                                            Previous
                                        </button>
                                    )}
                                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:ml-auto">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsModalOpen(false);
                                                setEditingStaff(null);
                                                setCurrentStep(1);
                                                reset();
                                            }}
                                            className="w-full sm:w-auto px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            {processing
                                                ? 'Saving...'
                                                : currentStep === totalSteps
                                                ? 'Save'
                                                : 'Next'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Summary Modal */}
                {isSummaryModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md mx-auto relative">
                            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Staff Summary</h2>
                                <button
                                    onClick={() => setIsSummaryModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="max-h-[60vh] overflow-y-auto p-4">
                                {renderSummary()}
                            </div>
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                                <button
                                    onClick={() => setIsSummaryModalOpen(false)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}