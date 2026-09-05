<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\ForceJsonApiResponseMiddleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        /*Az apiPrefix: 'api' beállítás azt határozza meg, hogy a routes/api.php fájlban definiált route-ok URL-je automatikusan /api előtaggal legyen elérhető.*/
        apiPrefix: 'api',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        /*A middleware  minden egyes kérés előtt és után lefut egy adott kód, ami módosíthatja a kérés vagy a válasz tartalmát. Ebben az esetben a ForceJsonApiResponseMiddleware middleware-t adjuk hozzá a middleware stack-hez, ami biztosítja, hogy minden válasz JSON formátumban legyen visszaküldve, még akkor is, ha a kliens nem kifejezetten JSON-t kér.*/
        $middleware->prepend(ForceJsonApiResponseMiddleware::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
