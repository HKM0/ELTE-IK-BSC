<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostStoreOrUpdateRequest;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Facades\Session;
//Két Session osztály is van, mi most ezt választottuk a flash miatt.

class PostController extends Controller
{
    //
    public function index()
    {
        //$posts = Post::all();
        //Azért kommenteltük ki az előző sort, és használjuk a következőt, hogy elkerüljük az N+1 problémát. Az N + 1 probléma tipikusan akkor jelenik meg, ha Eloquent kapcsolatokat (hasMany, belongsTo, stb.) használsz, és nem alkalmazol with()-et a kapcsolódó modellek előtöltésére. N + 1 probléma: a poszttal valamilyen relációban álló dologra vagyok kíváncsi, ne egyenként írjunk ki. Klasszikus teljesítményhiba, ami akkor fordul elő, amikor az alkalmazás túl sok lekérdezést futtat ugyanarra az adatra, ahelyett hogy összekapcsolva, egyben kérné le.Laravel debugbur-al néztük meg. Megoldás Laravelben – Eager Loading, with() metódus. Így csak 2 query lesz, nem sok: lekérem a posztot, és az összes usert egyben. Laravel ekkor JOIN-olja az adatokat, és csak két lekérdezést futtat, amiket megnézünk a Queries fülön debugburban: SELECT * FROM posts; és SELECT * FROM users WHERE id IN (1, 2, 3, ...); Sokkal gyorsabb és hatékonyabb.--}}
        //A paginate() Paginator objektumot ad vissza, ami a posztok egy részét tartalmazza, és információkat a lapozáshoz. A view-ban a links() metódussal megjeleníthetjük a lapozó gombokat. Ezzel elkerüljük, hogy egyszerre túl sok posztot töltsünk be, ami lassíthatná az oldalt.Dokumentáció: https://laravel.com/docs/12.x/pagination
        $posts = Post::with('author')->paginate(10);
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
    public function store(PostStoreOrUpdateRequest $request)
    {
        //dd(session('_token'));
        //A dd(session('_token')) arra használjuk, hogy megnézzük a session-ben tárolt CSRF token értékét, ami a formunkban is szerepel egy rejtett input mezőben. Ez segít ellenőrizni, hogy a CSRF védelem megfelelően működik-e, és hogy a token helyesen van-e kezelve a kérés során. A dd() függvény megállítja a kód végrehajtását, és kiírja a session '_token' értékét, így láthatjuk, hogy a token helyesen van-e generálva és átadva a formnak.

        /*validate() metódus:
- Title mező: kötelező (required), string típus, ha hiányzik → hiba
- Content mező:kötelező, string, minimum 10 karakter
- Author ID: kötelező, egész szám, exits:users,id : léteznie kell a users tábla id mezőjében
- Categories mező, ha van, akkor tömbnek kell lennie, ha nincs, nem hiba
- Categories elemei: Minden elem:, integer, nem ismétlődhet (distinct), léteznie kell a categories táblában
- 'content.min' => 'A tartalom legalább 10 karakter kell legyen!': felülírja az alapértelmezett min üzenetet, így is megadhatok saját hibaüzenetet
- Checkbox kezelése: ha nincs bepipálva, nem küld semmit, has():, true: bepipálva, false: nincs, így mindig boolean érték kerül mentésre. has: https://laravel.com/docs/12.x/requests#input-presence: •  A has() metódus akkor ad vissza true-t, ha a kéréshez olyan input kapcsolódik, amelynek a kulcsa létezik (pl. egy checkbox esetén). Ha egy mező nem szerepel a kérésben, akkor a has() false-t ad vissza
*/
        $validated = $request->validated();
        $validated['is_public'] = $request->has('is_public');
        //post mentése, tömeges feltöltés (mass assignment), csak a $fillable mezők kerülnek mentésre, visszatér a frissen létrehozott Post modellel
        $post = Post::create($validated);
        //ha voltak kategóriák → ID-k szinkronizálása, Pivot tábla (category_post) frissül
        $post->categories()->sync($validated['categories'] ?? []);
        //visszairányít a postlistára, elkerüli az űrlap újraküldését, pl F5 többszöri lenyomásakor
        Session::flash('post-created', $post->title);
        //A Laravel Session mechanizmusát használjuk egy egyszeri üzenet megjelenítésére: "Tedd be a sessionbe a következő oldalbetöltéséig. "A Session::flash() egy egyszeri üzenet tárolására szolgál a session-ben, ami a következő kérés során elérhető lesz, majd automatikusan törlődik. Itt a 'post-created' kulccsal tároljuk a létrehozott poszt címét, így a következő oldalbetöltéskor megjeleníthetjük ezt az üzenetet a felhasználónak, például egy sikeres létrehozásról szóló értesítés formájában.
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
    //A Request $request helyett a PostStoreOrUpdateRequest $request-et használjuk, hogy a validációs logikát kiszervezzük egy külön osztályba, és így tisztábban tartsuk a controller kódját. Ez a fajta típus-hinting lehetővé teszi, hogy a Laravel automatikusan injektálja a megfelelő Request objektumot, és előre végrehajtsa a validációt, mielőtt a controller metódus futna.
    public function update(PostStoreOrUpdateRequest $request, Post $post)
    {
        $validated = $request->validated();
        $validated['is_public'] = $request->has('is_public');
        $post->update($validated);
        $post->categories()->sync($validated['categories'] ?? []);
        return redirect()->route('posts.index');
    }
}
