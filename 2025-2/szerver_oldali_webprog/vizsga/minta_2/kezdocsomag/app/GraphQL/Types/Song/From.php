<?php declare(strict_types=1);

namespace App\GraphQL\Types\Song;

use App\Models\Song;
use App\Models\Country;

final readonly class From
{
    /** @param  array{}  $args */
    public function __invoke(Song $song, array $args): string
    {
        $country = Country::find($song->country_id);
        return $country->name ?? '';
    }
}
