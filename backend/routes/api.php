<?php

use App\Http\Controllers\EmpleadoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/registro-academy', [EmpleadoController::class, 'store']);
Route::get('/consulta-academy', [EmpleadoController::class, 'index']);
Route::put('/update-academy', [EmpleadoController::class, 'update']);
Route::delete('/delete-academy', [EmpleadoController::class, 'destroy']);
