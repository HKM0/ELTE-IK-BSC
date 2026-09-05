<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
/* Az Auth osztályt használjuk a bejelentkezéshez, a User modellt a felhasználók lekérdezéséhez, a Post modellt a posztok kezeléséhez, és a PostResource-t a posztok API válaszainak formázásához. */
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Post;
use App\Http\Resources\PostResource;



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



    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
