<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

Route::get('/', [PostController::class, 'index'])->name('posts.index');
// //A következő 2 sor sorrendje fontos. A router felülről lefelé nézi a route-okat, és az első illeszkedőt használja (mintaillesztés). A /posts/create URL illeszkedik a /posts/{post} mintára is. {post} = "create", megpróbál egy Post modellt keresni "create" azonosítóval. Nem talál, ezért 404 lesz. A konkrétabb route legyen előbb.
// Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
// Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');
// Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
// Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
// Route::patch('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
// Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy')
//A fenti sorokat lecseréltüke gyetlen sorra. A Route::resource() egy gyors módja annak, hogy egy teljes CRUD (Create, Read, Update, Delete) műveletet definiáljunk egy erőforrásra (jelen esetben a Post modelre). Ez automatikusan létrehozza a fenti route-okat a megfelelő HTTP metódusokkal és URL mintákkal, valamint hozzárendeli a megfelelő controller metódusokat. Így nem kell manuálisan megírni minden egyes route-ot, hanem elég egy sorban megadni, hogy melyik controller-t használjuk az adott erőforráshoz.
Route::resource('/posts', PostController::class);

Route::get('/dashboard', function () {
    //Átirányítás a dashboard helyett a posts.index-re, hogy ne egy üres dashboard oldalt lássunk, hanem rögtön a posztok listáját.
    return redirect()->route('posts.index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';