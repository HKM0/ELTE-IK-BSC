<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ForceJsonApiResponseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        /* Ha a kérés az api/* útvonalra irányul, és nem tartalmazza az 'Accept: application/json' fejlécet,
           akkor hozzáadjuk ezt a fejlécet a kéréshez, hogy biztosítsuk, hogy a válasz JSON formátumban érkezzen. */
        if (
            $request->is('api/*') &&
            !$request->headers->contains('Accept', 'application/json')
        )
            $request->headers->set('Accept', 'application/json');

        return $next($request);
    }
}
