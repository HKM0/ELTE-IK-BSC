<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//task 1
Route::get('/students', [ApiController::class, 'task1']);

//task 2
Route::get('/students/{id}/school', [ApiController::class, 'task2']);

//task 3
Route::post('/students',[ApiController::class, 'task3']);

//task 4
Route::get('/subjects',[ApiController::class, 'task4']);

//task 5
Route::post('login', [ApiController::class, 'task5']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

