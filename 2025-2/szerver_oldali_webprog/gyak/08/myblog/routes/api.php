<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/* Az ApiController osztályt importáljuk, hogy használhassuk a benne definiált metódusokat az API útvonalainkban. */
use App\Http\Controllers\ApiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

/* Az API útvonalak definiálása. A /login útvonal a POST metódust használja, és az ApiController login metódusát hívja meg, amely a bejelentkezést kezeli. */
Route::post('/login', [ApiController::class, 'login']);
