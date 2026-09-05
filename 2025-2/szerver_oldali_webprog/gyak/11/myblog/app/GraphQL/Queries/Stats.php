<?php

declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Post;
use App\Models\Category;


final readonly class Stats
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        // TODO implement the resolver
        //__invoke metódus egy speciális metódus, amely lehetővé teszi, hogy az osztály példányait függvényként használjuk. Ebben az esetben a Stats osztály egy GraphQL lekérdezést reprezentál, amely statisztikai összegzést ad vissza a posztokról. A $args tömb jelen esetben nem tartalmaz bemeneti argumentumokat, és a metódus visszatérési értéke egy tömb lesz, amely tartalmazza a posztok számát, a nyilvános posztok számát és a posztok átlagos számát kategóriánként.
        $categoryCount = Category::count();
        return [
            'postCount' => Post::count(),
            'publicPostCount' => Post::where('is_public', true)->count(),
            'postPerCategory' => $categoryCount > 0 ? Post::count() / $categoryCount : 0,
        ];
    }
}
