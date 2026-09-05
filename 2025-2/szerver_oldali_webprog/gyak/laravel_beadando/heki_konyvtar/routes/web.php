<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
/*
Route::get('/', function () {
    return view('welcome');
});
*/

//public
Route::get('/', [BookController::class, 'index'])->name('books.index');

//login mogott
Route::middleware('auth')->group(function () {

    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    /*
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');
    */

    // sajat profil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // admin masik felhasznalo profil szerkesztese
    Route::get('/profile/{user}/edit', [ProfileController::class, 'edit'])->name('profile.edit.user');
    Route::patch('/profile/{user}', [ProfileController::class, 'update'])->name('profile.update.user');
    Route::delete('/profile/{user}', [ProfileController::class, 'destroy'])->name('profile.destroy.user');

    //konyv letrehozas
    Route::get('/books/create', [BookController::class, 'create'])->name('books.create');
    Route::post('/books', [BookController::class, 'store'])->name('books.store');

    // konyv modositas
    Route::get('/books/{book}/edit', [BookController::class, 'edit'])->name('books.edit');
    Route::put('/books/{book}', [BookController::class, 'update'])->name('books.update');

    // konyv kolcsonzes
    Route::post('/books/{book}/borrow', [BookController::class, 'borrow'])->name('books.borrow');
    // konyv visszahozas
    Route::patch('/books/{book}/return', [BookController::class, 'returnBook'])->name('books.return');

    // konyv torles
    // soft
    Route::delete('/books/{book}', [BookController::class, 'destroy'])->name('books.destroy');
    // hard
    Route::delete('/books/{book}/force', [BookController::class, 'forceDestroy'])->name('books.force_destroy');

    // felhasznalo kolcson lista
    Route::get('/profile/{user}/loans', [ProfileController::class, 'loans'])->name('profile.loans');

    // hosszabitas
    Route::post('/loans/{user}/{book}/extend', [BookController::class, 'extend'])->name('books.extend');
    
    // elojegyzes 
    Route::post('/books/{book}/reserve', [BookController::class, 'reserve'])->name('books.reserve');
    // elojegyzes torles
    Route::delete('/books/{book}/reserve', [BookController::class, 'cancelReservation'])->name('books.cancel_reservation');
});

Route::get('/books/{book}', [BookController::class, 'show'])->name('books.show');

require __DIR__ . '/auth.php';
