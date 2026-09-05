<?php

namespace App\GraphQL\Resolvers;

use App\Models\Location;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class LocationResolver
{
    public function currentTemp(Location $location, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): ?float
    {
        // Legfrissebb weather bejegyzés (legnagyobb logged_at) lekérése
        $weather = $location->weather()
            ->orderBy('logged_at', 'DESC')
            ->first();

        // Ha nincs weather adat, null-t adunk vissza
        return $weather?->temp;
    }
}
