<?php

declare(strict_types=1);
//A logika külön fájlban: separation of concerns. Eddig a Ligthhouse megírta a logikát, pl @eq, stb esetében.
namespace App\GraphQL\Queries;

final readonly class Square
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        // TODO implement the resolver
        //__invoke metódus egy speciális metódus, amely lehetővé teszi, hogy az osztály példányait függvényként használjuk. Ebben az esetben a Square osztály egy GraphQL lekérdezést reprezentál, amely kiszámítja egy szám négyzetét. A $args tömb tartalmazza a bemeneti argumentumokat, és a metódus visszatérési értéke a szám négyzetét adja vissza.
        return $args['x'] * $args['x'];
    }
}
