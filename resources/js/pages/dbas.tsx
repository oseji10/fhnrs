// resources/js/Pages/DBAs.tsx
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Organization {
    id: number;
    dbaName: string;
    dbaType: string;
    status: string;
}

interface Props {
    dbas: Organization[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Departments, Boards and Agencies',
        href: '/dashboard',
    },
];

export default function DBAs({ dbas }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
    
    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        dbaName: '',
        dbaType: '',
        status: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingOrg) {
            put(`/dbas/${editingOrg.dbaId}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingOrg(null);
                    reset();
                }
            });
        } else {
            post('/dbas', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        }
    };

    const handleEdit = (org: Organization) => {
        setEditingOrg(org);
        setData({
            dbaName: org.dbaName,
            dbaType: org.dbaType,
            status: org.status
        });
        setIsModalOpen(true);
    };

    const handleDelete = (dbaId: number) => {
        if (confirm('Are you sure you want to delete this record?')) {
            destroy(`/dbas/${dbaId}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Departments, Boards and Agencies" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 relative">
                <div className="mb-4">
                    <button
                        onClick={() => {
                            setEditingOrg(null);
                            reset();
                            setIsModalOpen(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add DBA
                    </button>
                </div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Type
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
                                {dbas.map((org) => (
                                    <tr 
                                        key={org.dbaId}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-900"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            {org.dbaId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            {org.dbaName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            {org.dbaType}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            {org.status}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            <div className="flex space-x-2">
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
                                                    onClick={() => handleDelete(org.dbaId)}
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

                {/* Modal as Popup */}
                {isModalOpen && (
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {editingOrg ? 'Edit DBA' : 'Add New DBA'}
                                </h2>
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingOrg(null);
                                        reset();
                                    }}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.dbaName}
                                            onChange={(e) => setData('dbaName', e.target.value)}
                                            className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                            placeholder="Enter DBA name"
                                        />
                                        {errors.dbaName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.dbaName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Type
                                        </label>
                                        <select
                                            value={data.dbaType}
                                            onChange={(e) => setData('dbaType', e.target.value)}
                                            className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem_1rem]"
                                        >
                                            <option value="">Select Type</option>
                                            <option value="Department">Department</option>
                                            <option value="Board">Board</option>
                                            <option value="Agency">Agency</option>
                                            <option value="Hospital">Hospital</option>
                                        </select>
                                        {errors.dbaType && (
                                            <p className="mt-1 text-sm text-red-600">{errors.dbaType}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Status
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem_1rem]"
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                        {errors.status && (
                                            <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setEditingOrg(null);
                                            reset();
                                        }}
                                        className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-150 ease-in-out"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition duration-150 ease-in-out"
                                    >
                                        {processing ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}