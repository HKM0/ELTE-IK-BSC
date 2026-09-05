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
/* A Route::get('/posts', [ApiController::class, 'index']); sor egy új API végpontot definiál, amely lehetővé teszi a kliensek számára, hogy lekérdezzék az összes posztot. Amikor egy kliens GET kérést küld a /posts URL-re, az index metódus fogja kezelni a kérést az ApiController-ben, és visszaadja a posztok listáját a PostResource segítségével formázva. */
Route::get('/posts', [ApiController::class, 'index']);
/* A Route::get('/posts/{post}', [ApiController::class, 'show']); sor egy új API végpontot definiál, amely lehetővé teszi a kliensek számára, hogy lekérdezzék egy adott poszt részleteit azonosító alapján. A {post} helyőrző jelzi, hogy a kliensnek meg kell adnia egy poszt azonosítót a kérésben, és ez az érték át lesz adva a show metódusnak az ApiController-ben. */

Route::get('/posts', [ApiController::class, 'index']);

/* A Route::get('/posts/{post}', [ApiController::class, 'show']); sor egy új API végpontot definiál, amely lehetővé teszi a kliensek számára, hogy lekérdezzék egy adott poszt részleteit azonosító alapján. A {post} helyőrző jelzi, hogy a kliensnek meg kell adnia egy poszt azonosítót a kérésben, és ez az érték át lesz adva a show metódusnak az ApiController-ben. */
Route::get('/posts/categories', [ApiController::class, 'indexWithCategories']);
/* A Route::get('/posts/{post}', [ApiController::class, 'show']); sor egy új API végpontot definiál, amely lehetővé teszi a kliensek számára, hogy lekérdezzék egy adott poszt részleteit azonosító alapján. A {post} helyőrző jelzi, hogy a kliensnek meg kell adnia egy poszt azonosítót a kérésben, és ez az érték át lesz adva a show metódusnak az ApiController-ben. */
Route::get('/posts/{post}', [ApiController::class, 'show']);
/* A Route::post('/posts', [ApiController::class, 'store'])->middleware('auth:sanctum'); sor egy új API végpontot definiál, amely lehetővé teszi a kliensek számára, hogy új posztokat hozzanak létre. Ez a végpont POST kéréseket fogad a /posts URL-re, és a store metódus fogja kezelni ezeket a kéréseket az ApiController-ben. A middleware('auth:sanctum') rész biztosítja, hogy csak hitelesített felhasználók hozhassanak létre új posztokat, így megköveteli a megfelelő autentikációt a kérés során. */

Route::post('/posts', [ApiController::class, 'store'])->middleware('auth:sanctum');
/* A Route::patch('/posts/{post}', [ApiController::class, 'update'])->middleware('auth:sanctum'); sor egy új API végpontot definiál, amely lehetővé teszi a kliensek számára, hogy meglévő posztokat frissítsenek. Ez a végpont PATCH kéréseket fogad a /posts/{post} URL-re, ahol a {post} helyőrző jelzi, hogy a kliensnek meg kell adnia egy poszt azonosítót a kérésben. Az update metódus fogja kezelni ezeket a kéréseket az ApiController-ben, és a middleware('auth:sanctum') rész biztosítja, hogy csak hitelesített felhasználók frissíthessék a posztokat, így megköveteli a megfelelő autentikációt a kérés során. */
Route::patch('/posts/{post}', [ApiController::class, 'update'])->middleware('auth:sanctum');
/* A Route::get('/posts/{post}/categories', [ApiController::class, 'indexCategories']); sor egy új API végpontot definiál, amely lehetővé teszi a kliensek számára, hogy lekérdezzék egy adott poszthoz kapcsolódó kategóriákat. Ez a végpont GET kéréseket fogad a /posts/{post}/categories URL-re, ahol a {post} helyőrző jelzi, hogy a kliensnek meg kell adnia egy poszt azonosítót a kérésben. Az indexCategories metódus fogja kezelni ezeket a kéréseket az ApiController-ben, és visszaadja a poszthoz kapcsolódó kategóriák listáját a CategoryResource segítségével formázva. */
Route::get('/posts/{post}/categories', [ApiController::class, 'indexCategories']);
