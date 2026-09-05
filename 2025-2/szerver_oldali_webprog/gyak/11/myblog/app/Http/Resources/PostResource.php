<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
/* A PostResource osztály egy JSON erőforrás, amely a posztok adatait formázza az API válaszaihoz. A toArray() metódusban meghatározzuk, hogy milyen adatokat szeretnénk visszaadni a posztokról, és hogyan szeretnénk formázni ezeket az adatokat. */

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /* A metódus visszaadja a poszt adatait egy asszociatív tömbben, amely tartalmazza a poszt azonosítóját, címét, tartalmát, szerzőjének azonosítóját, nyilvános-e a poszt, valamint a létrehozás és frissítés időpontját. */
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'is_public' => boolval($this->is_public),
            'author_id' => $this->author_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            /* A whenLoaded() metódus egy feltételes mezőt ad hozzá a válaszhoz, amely csak akkor jelenik meg, ha a 'categories' kapcsolat betöltve van. Ha a kapcsolat betöltve van, akkor a CategoryResource::collection() segítségével formázza a kapcsolódó kategóriákat. */
            'categories' => CategoryResource::collection($this->whenLoaded('categories'))
        ];
    }
}
