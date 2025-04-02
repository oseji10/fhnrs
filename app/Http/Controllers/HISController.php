<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HIS;
use Inertia\Inertia;
class HISController extends Controller
{
    public function index()
    {
        $his = HIS::all();
        
        return Inertia::render('his', [
            'his' => $his
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'hisName' => 'required|string|max:255',
            'status' => 'required|in:Active,Inactive',
        ]);

        HIS::create($validated);

        return redirect()->route('his.index');
    }


    public function update(Request $request, HIS $his)
    {
        $validated = $request->validate([
            'hisName' => 'required|string|max:255',
            'status' => 'required|in:Active,Inactive',
        ]);

        $his->update($validated);

        return redirect()->route('his.index');
    }

    public function destroy(HIS $his)
    {
        $his->delete();
        return redirect()->route('his.index');
    }
}
