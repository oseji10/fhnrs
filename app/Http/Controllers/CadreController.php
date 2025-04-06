<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DBAs;
use App\Models\Cadre;
use App\Models\CadreGroup;
use App\Models\CadreSubgroup;
use Inertia\Inertia;
class CadreController extends Controller
{
    public function index()
    {
        $cadres = Cadre::all();
        
        return Inertia::render('cadres', [
            'cadres' => $cadres,
            'cadreGroups' => CadreGroup::all(),
            'cadreSubgroups' => CadreSubgroup::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cadreName' => 'required|string|max:255',
            // 'step' => 'required|in:Step 1,Step 2,Step 3, Step 4, Step 5, Step 6',
            'maximumGradeLevel' => 'nullable',
            'maximumStep' => 'nullable',
            'cadreGroupId' => 'required|integer',
            'cadreSubGroupId' => 'required|integer',
        ]);

        Cadre::create($validated);

        return redirect()->route('cadres.index');
    }


    public function storeCadreGroup(Request $request)
    {
        $validated = $request->validate([
            'cadreGroupName' => 'required|string|max:255',
            // 'cadreGroupId' => 'required|integer',
        ]);

        CadreGroup::create($validated);

        return redirect()->route('cadres.index');
    }

    public function storeCadreSubGroup(Request $request)
    {
        $validated = $request->validate([
            'cadreSubGroupName' => 'required|string|max:255',
            'cadreGroupId' => 'required|integer',
        ]);

        CadreSubGroup::create($validated);

        return redirect()->route('cadres.index');
    }


    public function update(Request $request, Cadre $cadres)
    {
        $validated = $request->validate([
            'cadreName' => 'required|string|max:255',
            // 'step' => 'required',
            // 'gradeLevel' => 'nullable',
            'maximumGradeLevel' => 'nullable',
            'maximumStep' => 'nullable',
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
