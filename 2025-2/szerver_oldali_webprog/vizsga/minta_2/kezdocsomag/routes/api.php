<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/songs', [ApiController::class, 'getSongs']);
//Minta kérés: GET http://localhost:8000/api/songs/2025
Route::get('/songs/{year}', [ApiController::class, 'getSong']);

//POST http://localhost:8000/api/songs
Route::post('/songs', [ApiController::class, 'createSong']);

Route::patch('/songs/{id}', [ApiController::class, 'updateSong']);

Route::get('/results/{year}', [ApiController::class, 'getResults']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

