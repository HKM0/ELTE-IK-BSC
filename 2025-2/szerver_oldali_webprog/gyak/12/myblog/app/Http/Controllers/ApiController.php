<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
/* Az Auth osztályt használjuk a bejelentkezéshez, a User modellt a felhasználók lekérdezéséhez, a Post modellt a posztok kezeléséhez, és a PostResource-t a posztok API válaszainak formázásához. */
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Post;
use App\Http\Resources\PostResource;
use App\Http\Requests\PostStoreOrUpdateRequest;
use App\Http\Resources\CategoryResource;


class ApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    /* A login metódus a bejelentkezést kezeli. Először validálja a bejövő kérést, majd megpróbálja autentikálni a felhasználót az Auth::attempt() segítségével. Ha sikeres, létrehoz egy új token-t a felhasználó számára és visszaadja azt JSON formátumban. Ha a bejelentkezés sikertelen, egy 401-es hibakódot és egy hibaüzenetet ad vissza. */
    public function login(Request $request)
    {
        $validated = $request->validate([
            "email" => "required|string|email",
            "password" => "required|string"
        ]);

        if (Auth::attempt($validated)) {
            $user = User::where('email', $validated['email'])->first();
            $token = $user->createToken('loginToken');
            return response()->json(["token" => $token->plainTextToken], 201);
        } else {
            return response()->json(["message" => "Login failed."], 401);
        }
    }

    /* A metódus visszaadja az összes posztot a PostResource segítségével formázva. */
    public function index()
    {
        $posts = Post::all();
        //return response() -> json($posts);
        return PostResource::collection($posts);
    }


    /**
     * Store a newly created resource in storage.
     */
    /* A metódus validálja a bemeneti adatokat a PostStoreOrUpdateRequest segítségével, majd létrehoz egy új posztot az adatbázisban a validált adatok alapján, és visszaadja a létrehozott posztot a PostResource segítségével formázva. */
    public function store(PostStoreOrUpdateRequest $request)
    {
        $validated = $request->validated();
        //kérdés, hogy itt van-e a legelegánsabb helye
        $validated['is_public'] = $request->has('is_public');
        $validated['author_id'] = $request->user()->id;
        $post = Post::create($validated);
        return new PostResource($post);
    }


    /**
     * Display the specified resource.
     */
    /* A metódus validálja a bemeneti paramétert, majd megkeresi a posztot az adatbázisban és visszaadja azt a PostResource segítségével formázva. */
    public function show(string $post)
    {
        validator(
            ['post' => $post],
            ['post' => 'required|integer']
        )->validate();
        /* A findOrFail() Laravel Eloquent metódus, amely rekordot keres az adatbázisban az ID alapján, és ha nem találja, automatikusan hibát dob.*/
        $post = Post::findOrFail($post);
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     */
    /* A metódus validálja a bemeneti paramétert, majd megkeresi a posztot az adatbázisban. Ezután ellenőrzi, hogy a kérésben szereplő felhasználó vagy adminisztrátor-e, vagy a poszt szerzője-e. Ha nem, egy 403-as hibakódot és egy hibaüzenetet ad vissza. Ha a felhasználó jogosult, akkor validálja a bemeneti adatokat, frissíti a posztot az adatbázisban a validált adatok alapján, és visszaadja a frissített posztot a PostResource segítségével formázva. */
    public function update(Request $request, string $post)
    {
        validator(
            ['post' => $post],
            ['post' => 'required|integer']
        )->validate();
        $post = Post::findOrFail($post);
        /* A feltétel ellenőrzi, hogy a kérésben szereplő felhasználó nem adminisztrátor és nem a poszt szerzője-e. Ha mindkét feltétel igaz, akkor a felhasználó nem jogosult a művelet végrehajtására, és egy 403-as hibakódot és egy hibaüzenetet ad vissza. Ez a biztonsági intézkedés biztosítja, hogy csak az adminisztrátorok vagy a poszt szerzői módosíthassák a posztokat. */
        if (!$request->user()->is_admin && $request->user()->id !== $post->author_id)
            return response()->json(["message" => "You cannot do this."], 403);
        $validated = $request->validate([
            "title" => "string|min:10",
            "content" => "string|max:999",
            "is_public" => "boolean",
            'author_id' => "integer|exists:users,id"
        ]);
        $post->update($validated);
        return new PostResource($post);
    }

    /* A metódus validálja a bemeneti paramétert, majd megkeresi a posztot az adatbázisban és visszaadja a kapcsolódó kategóriákat a CategoryResource segítségével formázva. */
    public function indexCategories(string $post)
    {
        validator(
            ['post' => $post],
            ['post' => 'required|integer']
        )->validate();
        $post = Post::findOrFail($post);
        return CategoryResource::collection($post->categories);
    }
    /* A metódus visszaadja az összes posztot a kapcsolódó kategóriáikkal együtt a PostResource segítségével formázva. A with('categories') rész biztosítja, hogy a posztokhoz kapcsolódó kategóriák is betöltődjenek, így elkerülve az N+1 problémát. */
    public function indexWithCategories()
    {
        $posts = Post::with('categories')->get();
        return PostResource::collection($posts);
    }
    /* A metódus validálja a bemeneti paramétert, majd megkeresi a posztot az adatbázisban. Ezután validálja a bemeneti adatokat, és frissíti a poszthoz kapcsolódó kategóriákat az adatbázisban a validált adatok alapján. Végül visszaadja egy összefoglaló választ arról, hogy mely kategóriák lettek hozzáadva, melyek voltak már hozzáadva, melyek lettek eltávolítva, és melyek voltak már eltávolítva. */
    public function updateCategories(Request $request, string $post)
    {
        validator(
            ['post' => $post],
            ['post' => 'required|integer']
        )->validate();
        /* A findOrFail() Laravel Eloquent metódus, amely rekordot keres az adatbázisban az ID alapján, és ha nem találja, automatikusan hibát dob. */
        $post = Post::findOrFail($post);
        $validated = $request->validate([
            "add" => "array",
            "remove" => "array",
            "add.*" => "integer|distinct|exists:categories,id|not_in:" . implode(",", $request->input('remove') ?? []),
            "remove.*" => "integer|distinct|exists:categories,id|not_in:" . implode(",", $request->input('add') ?? []),
        ]);
        /* A $validated["add"] ??= []; és a $validated["remove"] ??= []; sorok biztosítják, hogy ha a kérésben nem szerepel az "add" vagy "remove" kulcs, akkor ezek üres tömbökként legyenek inicializálva. Ez megakadályozza a hibákat a későbbi műveletek során, amikor ezeket a kulcsokat használjuk a kategóriák frissítéséhez. */
        $validated["add"] ??= [];
        $validated["remove"] ??= [];
        /* A $start változóban eltároljuk a poszthoz kapcsolódó kategóriák azonosítóit egy tömbben, hogy később össze tudjuk hasonlítani a frissítés előtt és után lévő állapotot. Ez lehetővé teszi számunkra, hogy pontosan meghatározzuk, mely kategóriák lettek hozzáadva vagy eltávolítva a poszthoz. */
        $start = $post->categories->pluck('id')->toArray();
        /* attach metódus a vak hozzáadásra szolgál, de ha ugyanazt a kategóriát próbáljuk meg hozzáadni többször, akkor adatbázis hibát okoz, mivel a pivot táblában nem lehet duplikált rekord. Ezért a syncWithoutDetaching metódust használjuk, amely hozzáadja a megadott kategória azonosítókat a poszthoz kapcsolódó kategóriák listájához anélkül, hogy eltávolítaná a már meglévő kapcsolatokat. Ez azt jelenti, hogy ha egy kategória már kapcsolódik a poszthoz, akkor nem fog újra hozzáadódni, és nem fog hibát okozni, mint az attach metódus esetében. */
        //$post->categories()->attach($validated["add"]);
        $post->categories()->syncWithoutDetaching($validated["add"]);
        /* A detach metódus eltávolítja a megadott kategória azonosítókat a poszthoz kapcsolódó kategóriák listájából. Ez azt jelenti, hogy ha egy kategória kapcsolódik a poszthoz, és a kérésben szerepel a "remove" kulcsban, akkor ez a kapcsolat megszűnik, és a poszt már nem lesz kapcsolódva ahhoz a kategóriához. */
        $post->categories()->detach($validated["remove"]);
        // return CategoryResource::collection($post -> categories);
        /* A return részben egy összefoglaló választ adunk vissza arról, hogy mely kategóriák lettek hozzáadva, melyek voltak már hozzáadva, melyek lettek eltávolítva, és melyek voltak már eltávolítva. Az array_diff és array_intersect függvényeket használjuk a tömbök összehasonlítására és a megfelelő értékek meghatározására. Ez az információ hasznos lehet a kliens számára, hogy megértse, milyen változások történtek a poszthoz kapcsolódó kategóriákban a frissítés során. */
        return [
            "added" => array_diff($validated["add"], $start),
            "was already added" => array_values(array_intersect($start, $validated["add"])),
            "removed" => array_values(array_intersect($start, $validated["remove"])),
            "was already removed" => array_diff($validated["remove"], $start)
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
