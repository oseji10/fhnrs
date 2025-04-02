<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DBAs;
use Inertia\Inertia;
class DBAController extends Controller
{
    public function index()
    {
        $dbas = DBAs::all();
        
        return Inertia::render('dbas', [
            'dbas' => $dbas
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'dbaName' => 'required|string|max:255',
            'dbaType' => 'required|in:Department,Board,Agency',
            'status' => 'required|in:Active,Inactive',
        ]);

        DBAs::create($validated);

        return redirect()->route('dbas.index');
    }


    public function update(Request $request, DBAs $dbas)
    {
        $validated = $request->validate([
            'dbaName' => 'required|string|max:255',
            'dbaType' => 'required|in:Department,Board,Agency',
            'status' => 'required|in:Active,Inactive',
        ]);

        $dbas->update($validated);

        return redirect()->route('dbas.index');
    }

    public function destroy(DBAs $dbas)
    {
        $dbas->delete();
        return redirect()->route('dbas.index');
    }
}
