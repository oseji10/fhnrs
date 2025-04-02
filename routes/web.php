<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DBAController;
use App\Http\Controllers\CadreController;
use App\Http\Controllers\PFAController;
use App\Http\Controllers\HISController;
use App\Http\Controllers\StaffController;
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Route::get('dbas', function () {
    //     return Inertia::render('dbas');
    // })->name('dbas');

    Route::get('/dbas', [DBAController::class, 'index'])->name('dbas.index');
    Route::post('/dbas', [DBAController::class, 'store'])->name('dbas.store');
    Route::put('/dbas/{dbas}', [DBAController::class, 'update'])->name('dbas.update');
    Route::delete('/dbas/{dbas}', [DBAController::class, 'destroy'])->name('dbas.destroy');

    Route::get('/cadres', [CadreController::class, 'index'])->name('cadres.index');
    Route::post('/cadres', [CadreController::class, 'store'])->name('cadres.store');
    Route::put('/cadres/{cadres}', [CadreController::class, 'update'])->name('cadres.update');
    Route::delete('/cadres/{cadres}', [CadreController::class, 'destroy'])->name('cadres.destroy');

    Route::get('/pfas', [PFAController::class, 'index'])->name('pfas.index');
    Route::post('/pfas', [PFAController::class, 'store'])->name('pfas.store');
    Route::put('/pfas/{pfas}', [PFAController::class, 'update'])->name('pfas.update');
    Route::delete('/pfas/{pfas}', [PFAController::class, 'destroy'])->name('pfas.destroy');

    Route::get('/his', [HISController::class, 'index'])->name('his.index');
    Route::post('/his', [HISController::class, 'store'])->name('his.store');
    Route::put('/his/{his}', [HISController::class, 'update'])->name('his.update');
    Route::delete('/his/{his}', [HISController::class, 'destroy'])->name('his.destroy');

    Route::get('/staff', [StaffController::class, 'index'])->name('staff.index');
    Route::post('/staff', [StaffController::class, 'store'])->name('staff.store');
    Route::put('/staff/{staff}', [StaffController::class, 'update'])->name('staff.update');
    Route::delete('/staff/{staff}', [StaffController::class, 'destroy'])->name('staff.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
