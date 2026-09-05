<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Category;

class PostController extends Controller
{
    //
    public function index()
    {
        //$posts = Post::all();
        //Azért kommenteltük ki az előző sort, és használjuk a következőt, hogy elkerüljük az N+1 problémát. Az N + 1 probléma tipikusan akkor jelenik meg, ha Eloquent kapcsolatokat (hasMany, belongsTo, stb.) használsz, és nem alkalmazol with()-et a kapcsolódó modellek előtöltésére. N + 1 probléma: a poszttal valamilyen relációban álló dologra vagyok kíváncsi, ne egyenként írjunk ki. Klasszikus teljesítményhiba, ami akkor fordul elő, amikor az alkalmazás túl sok lekérdezést futtat ugyanarra az adatra, ahelyett hogy összekapcsolva, egyben kérné le.Laravel debugbur-al néztük meg. Megoldás Laravelben – Eager Loading, with() metódus. Így csak 2 query lesz, nem sok: lekérem a posztot, és az összes usert egyben. Laravel ekkor JOIN-olja az adatokat, és csak két lekérdezést futtat, amiket megnézünk a Queries fülön debugburban: SELECT * FROM posts; és SELECT * FROM users WHERE id IN (1, 2, 3, ...); Sokkal gyorsabb és hatékonyabb.--}}

        $posts = Post::with('author')->get();
        return view('posts.index', ['posts' => $posts]);
    }

    //Azért van egyes számban a post az index metódussal szemben, mert itt egy darab Post objektummal dolgozunk, fent pedig egy Collection-ről van szó. Több poszt helyett ($posts) egy poszt ($post) van. Az egyes/többesszám segít látni, hogy  Collectionről vagy objektumról van szó.
    public function show(Post $post)
    {
        return view('posts.show', ['post' => $post]);
    }
    //create(): megjeleniti az űrlapot, amit ki kell töltenem
    public function create()
    {
        return view('posts.create', [
            'users' => User::all(),
            'categories' => Category::all()
        ]);
    }
    //store() metódus: validálja a bejövő adatokat, kezeli a checkboxot, elmenti a posztot, szinkronizálja a kategóriákat, majd visszairányít a posztlistára. Request $request: az aktuális HTTP kérés objektuma.
    public function store(Request $request)
    {

        /*validate() metódus:
- Title mező: kötelező (required), string típus, ha hiányzik → hiba
- Content mező:kötelező, string, minimum 10 karakter
- Author ID: kötelező, egész szám, exits:users,id : léteznie kell a users tábla id mezőjében
- Categories mező, ha van, akkor tömbnek kell lennie, ha nincs, nem hiba
- Categories elemei: Minden elem:, integer, nem ismétlődhet (distinct), léteznie kell a categories táblában
- 'content.min' => 'A tartalom legalább 10 karakter kell legyen!': felülírja az alapértelmezett min üzenetet, így is megadhatok saját hibaüzenetet
- Checkbox kezelése: ha nincs bepipálva, nem küld semmit, has():, true: bepipálva, false: nincs, így mindig boolean érték kerül mentésre. has: https://laravel.com/docs/12.x/requests#input-presence: •  A has() metódus akkor ad vissza true-t, ha a kéréshez olyan input kapcsolódik, amelynek a kulcsa létezik (pl. egy checkbox esetén). Ha egy mező nem szerepel a kérésben, akkor a has() false-t ad vissza
*/
        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string|min:10',
            'author_id' => 'required|integer|exists:users,id',
            'categories' => 'array',
            'categories.*' => 'integer|distinct|exists:categories,id'
        ], [
            'content.min' => 'A tartalom legalább 10 karakter kell legyen!'
        ]);
        $validated['is_public'] = $request->has('is_public');
        //post mentése, tömeges feltöltés (mass assignment), csak a $fillable mezők kerülnek mentésre, visszatér a frissen létrehozott Post modellel
        $post = Post::create($validated);
        //ha voltak kategóriák → ID-k szinkronizálása, Pivot tábla (category_post) frissül
        $post->categories()->sync($validated['categories'] ?? []);
        //visszairányít a postlistára, elkerüli az űrlap újraküldését, pl F5 többszöri lenyomásakor
        return redirect()->route('posts.index');
    }
    public function edit(Post $post)
    {
        return view('posts.edit', [
            'users' => User::all(),
            'categories' => Category::all(),
            'post' => $post
        ]);
    }
    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string|min:10',
            'author_id' => 'required|integer|exists:users,id',
            'categories' => 'array',
            'categories.*' => 'integer|distinct|exists:categories,id'
        ], [
            'content.min' => 'A tartalom legalább 10 karakter kell legyen!'
        ]);
        $validated['is_public'] = $request->has('is_public');
        $post->update($validated);
        $post->categories()->sync($validated['categories'] ?? []);
        return redirect()->route('posts.index');
    }
}
