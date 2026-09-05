<?php

declare(strict_types=1);

namespace App\GraphQL\Types\Post;

use App\Models\Post;

final readonly class Length
{
    /** @param  array{}  $args */
    public function __invoke(Post $_, array $args)
    {
        // TODO implement the resolver
        // számold meg, hány karakterből áll a poszt tartalma, egy számított mezőt ad vissza: a poszt tartalmának hosszát. maga az aktuális Post objektum, $_ = az aktuális poszt, $_->content: a poszt tartalma. mb_strlen: megszámolja a karaktereket Unicode-kompatibilisen, pl 1 (valós karakter) lesz az „á”, nem 2, mint strlen esetén. A mb_strlen($_->content) kiszámolja a poszt tartalmának hosszát karakterekben, Unicode-kompatibilis módon.
        return mb_strlen($_->content);
    }
}
