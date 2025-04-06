<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Staff;
use App\Models\Cadre;
use App\Models\DBAs;
use Inertia\Inertia;
class StaffController extends Controller
{
    public function index()
    {
        // Fetch all staff, cadres, and dbas
        $staff = Staff::all();
        $cadres = Cadre::all();
        $dbas = DBAs::all(['dbaId', 'dbaName']);
    
        return Inertia::render('staff', [
            'staff' => $staff,
            'cadres' => $cadres,
            'dbas' => $dbas,
        ]);
    }

    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
    'surname' => 'required|string|max:255',
    'fileNumber' => 'nullable',
    'firstName' => 'nullable',
    'otherNames' => 'nullable',
    'dateOfBirth' => 'nullable',
    'gender' => 'nullable',
    'stateOfOrigin' => 'nullable',
    'lgaOfOrigin' => 'nullable',
    'dateOfFirstAppointment' => 'nullable',
    'dateOfPresentAppointment' => 'nullable',
    'dateOfConfirmation' => 'nullable',
    'cadre' => 'nullable',
    'accountNumber' => 'nullable',
    'bankId' => 'nullable',
    'PFANumber' => 'nullable',
    'PFA' => 'nullable',
    'NHFNumber' => 'nullable',
    'HISNumber' => 'nullable',
    "HIS" => 'nullable',
    'dba' => 'nullable',
    'status' => 'nullable',
    // 'userId',
        ]);

        Staff::create($validated);

        return redirect()->route('staff.index');
    }


    public function update(Request $request, Staff $staff)
    {
        $validated = $request->validate([
            'surname' => 'required|string|max:255',
    'fileNumber' => 'nullable',
    'firstName' => 'nullable',
    'otherNames' => 'nullable',
    'dateOfBirth' => 'nullable',
    'gender' => 'nullable',
    'stateOfOrigin' => 'nullable',
    'lgaOfOrigin' => 'nullable',
    'dateOfFirstAppointment' => 'nullable',
    'dateOfPresentAppointment' => 'nullable',
    'dateOfConfirmation' => 'nullable',
    'cadre' => 'nullable',
    'accountNumber' => 'nullable',
    'bankId' => 'nullable',
    'PFANumber' => 'nullable',
    'PFA' => 'nullable',
    'NHFNumber' => 'nullable',
    'HISNumber' => 'nullable',
    "HIS" => 'nullable',
    'dba' => 'nullable',
    'status' => 'nullable',

        ]);

        $staff->update($validated);

        return redirect()->route('staff.index');
    }

    public function destroy(Staff $staff)
    {
        $staff->delete();
        return redirect()->route('staff.index');
    }
}
