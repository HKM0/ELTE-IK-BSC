<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Location;
use App\Models\Weather;
use App\Models\Warning;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{
    public function getLocations()
    {
        return Location::all();
    }

    public function getLocation($id)
    {
        //Válasz, ha az id paraméter nem egész szám: 422 UNPROCESSABLE CONTENT
        if (!is_numeric($id) || intval($id) != $id || $id <= 0) {
            return response()->json([], 422);
        }

        //Válasz, ha a megadott id-vel nem létezik mérőhely: 404 NOT FOUND
        $location = Location::find($id);

        if (!$location) {
            return response()->json([], 404);
        }

        //Válasz helyes kérés esetén: 200 OK
        return $location;
    }

    public function createLocation(Request $request)
    {
        // Validáció - Válasz, ha a kérés törzse (body) hiányos vagy típushibás adatot tartalmaz: 422 UNPROCESSABLE CONTENT
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string',
            'lat' => 'required|numeric',
            'lon' => 'required|numeric',
            'public' => 'sometimes|boolean'
        ]);

        // Válasz, ha a kérésben szereplő név vagy email nem egyedi: 409 CONFLICT
        if (Location::where('name', $validated['name'])->exists() ||
            Location::where('email', $validated['email'])->exists()) {
            return response()->json([], 409);
        }

        // Public default értéke true
        $validated['public'] = $validated['public'] ?? true;

        // Jelszó hashelése
        $validated['password'] = password_hash($validated['password'], PASSWORD_DEFAULT);

        // Létrehozás
        $location = Location::create($validated);

        // Válasz helyes kérés esetén: 201 CREATED
        return response()->json($location, 201);
    }

    public function deleteLocation($id)
    {
        // Válasz, ha az id paraméter nem egész szám: 422 UNPROCESSABLE CONTENT
        if (!is_numeric($id) || intval($id) != $id || $id <= 0) {
            return response()->json([], 422);
        }

        // Válasz, ha a megadott id-vel nem létezik mérőhely: 404 NOT FOUND
        $location = Location::find($id);

        if (!$location) {
            return response()->json([], 404);
        }

        // Törlés
        $location->delete();

        // Válasz helyes kérés esetén: 200 OK
        return response()->json([], 200);
    }

    public function login(Request $request)
    {
        // Válasz, ha a kérés formailag hibás: 422 UNPROCESSABLE CONTENT
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        // Mérőhely megkeresése
        $location = Location::where('email', $validated['email'])->first();

        // Válasz, ha nem létezik ilyen e-mail cím vagy helytelen a bejegyzett jelszó: 401 UNAUTHORIZED
        if (!$location || !password_verify($validated['password'], $location->password)) {
            return response()->json([], 401);
        }

        // Token generálása
        $token = $location->createToken('api-token')->plainTextToken;

        // Válasz helyes kérés esetén: 201 CREATED
        return response()->json(['token' => $token], 201);
    }
}