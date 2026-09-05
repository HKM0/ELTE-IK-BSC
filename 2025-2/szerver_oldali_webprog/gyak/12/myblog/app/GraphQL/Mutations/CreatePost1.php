<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Post;

final readonly class CreatePost1
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        // a $validated változó létrehozása, amely a validator függvény által visszaadott értékeket tartalmazza, amely a $args tömbből származó értékeket validálja a megadott szabályok szerint.
        $validated = validator(
            [
                'title' => $args['title'],
                'content' => $args['content'],
                'author_id' => $args['author_id'],
                'is_public' => $args['is_public']
            ],
            [
                'title' => ['required|string|min:1'],
                'content' => ['required', 'string'],
                // 'author_id' mező kötelező, és léteznie kell a users táblában, ahol az id oszlop értékének meg kell egyeznie az author_id értékével.
                'author_id' => ['required', 'exists:users,id'],
                'is_public' => ['required', 'boolean'],
            ]
            // A validate() függvény meghívása a validator objektumon, amely elvégzi a validációt a megadott szabályok szerint, és ha a validáció sikeres, akkor visszaadja a validált adatokat. Ha a validáció sikertelen, akkor kivételt dob.
        )->validate();
        // a $validated változóban tárolt értékek alapján létrehoz egy új Post rekordot az adatbázisban, és visszaadja a létrehozott Post objektumot.
        return Post::create($args);
    }
}
