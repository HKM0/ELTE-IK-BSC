<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Country;
use App\Models\Song;
use App\Models\Vote;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{
    public function getSongs()
    {
        return Song::all();
    }
    
    public function getSong($year)
    {
        if(!is_numeric($year) || intval($year) != $year || $year <= 0)
        {
            return response()->json([], 422);
        }
        
        $songs = Song::where('year', $year)->get();
        return $songs;
    }

    public function createSong(Request $request)
    {
        //Válasz, ha a kérés törzse (body) validációs hibát tartalmaz: 422 UNPROCESSABLE CONTENT
        $validated = $request->validate([
            'title' => 'required|string',
            'artist' => 'required|string',
            'year' => 'required|integer|max:2030|min:2000',
            'country_id' => 'required|integer|exists:countries,id'
        ]);

        //Válasz, ha az országhoz már tartozik ebben az évben dal: 409 CONFLICT
        if (Song::where('country_id', $validated['country_id'])->where('year', $validated['year'])->exists()) 
        {
            return response()->json([], 409);
        }

        //letrehozas
        $song = Song::create($validated);

        //Válasz helyes kérés esetén: 201 CREATED
        return response()->json($song, 201);
    }

    public function updateSong(Request $request, $id)
    {
        //Válasz, ha az id paraméter nem egész szám: 422 UNPROCESSABLE CONTENT
        if (!is_numeric($id) || intval($id) != $id || $id <= 0) {
            return response()->json([], 422);
        }

        //Válasz, ha a megadott id-vel nem létezik dal: 404 NOT FOUND
        $song = Song::find($id);

        if (!$song) {
            return response()->json([], 404);
        }

        //Validáció - az optional mezőkre 'sometimes' szabály
        $validated = $request->validate([
            'title' => 'sometimes|string',
            'artist' => 'sometimes|string',
            'year' => 'sometimes|integer|min:2000|max:2030',
            'country_id' => 'sometimes|integer|exists:countries,id'
        ]);

        //Válasz, ha az országhoz már tartozik ebben az évben dal: 409 CONFLICT
        if (isset($validated['year']) || isset($validated['country_id'])) {
            $country_id = $validated['country_id'] ?? $song->country_id;
            $year = $validated['year'] ?? $song->year;
            
            // Ellenőrizzük, hogy van-e már ilyen combo a jelenlegi soron kívül
            if (Song::where('country_id', $country_id)
                    ->where('year', $year)
                    ->where('id', '!=', $id)
                    ->exists()) 
            {
                return response()->json([], 409);
            }
        }

        //Válasz helyes kérés esetén: 200 OK
        $song->update($validated);

        return response()->json($song, 200);
    }

    public function getResults($year)
    {
        //Validáció az évhez (hasonló a 2. feladathoz)
        if (!is_numeric($year) || intval($year) != $year || $year <= 0) {
            return response()->json([], 422);
        }

        //Az adott évi dalok lekérése
        $songs = Song::where('year', $year)->get();

        //Minden dalhoz hozzáadjuk az összes szavazat pontjait
        $songs->each(function($song) {
            $song->totalPoints = Vote::where('to_song_id', $song->id)->sum('points');
        });

        //Csökkenő sorrendben rendezés az össz pontok alapján + values() a holtversenyhez
        $songs = $songs->sortByDesc('totalPoints')->values();

        return response()->json($songs, 200);
    }
}