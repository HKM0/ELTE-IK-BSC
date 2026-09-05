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


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
