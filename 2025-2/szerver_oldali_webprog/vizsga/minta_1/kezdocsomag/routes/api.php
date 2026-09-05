<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/locations', [ApiController::class, 'getLocations']);
Route::get('/locations/{id}', [ApiController::class, 'getLocation']);
Route::post('/locations', [ApiController::class, 'createLocation']);
Route::delete('/locations/{id}', [ApiController::class, 'deleteLocation']);
Route::post('/login', [ApiController::class, 'login']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

