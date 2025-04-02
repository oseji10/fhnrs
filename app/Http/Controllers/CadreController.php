<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DBAs;
use App\Models\Cadre;
use Inertia\Inertia;
class CadreController extends Controller
{
    public function index()
    {
        $cadres = Cadre::all();
        
        return Inertia::render('cadres', [
            'cadres' => $cadres
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cadreName' => 'required|string|max:255',
            'step' => 'required|in:Step 1,Step 2,Step 3, Step 4, Step 5, Step 6',
            
        ]);

        Cadre::create($validated);

        return redirect()->route('cadres.index');
    }


    public function update(Request $request, Cadre $cadres)
    {
        $validated = $request->validate([
            'cadreName' => 'required|string|max:255',
            'step' => 'required|in:Step 1,Step 2,Step 3, Step 4, Step 5, Step 6',
        ]);

        $cadres->update($validated);

        return redirect()->route('cadres.index');
    }

    public function destroy(Cadre $cadres)
    {
        $cadres->delete();
        return redirect()->route('cadres.index');
    }
}
