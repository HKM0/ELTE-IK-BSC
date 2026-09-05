<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
/* A CategoryResource osztály egy JSON erőforrás, amely a kategóriák adatait formázza az API válaszaihoz. A toArray() metódusban meghatározzuk, hogy milyen adatokat szeretnénk visszaadni a kategóriákról, és hogyan szeretnénk formázni ezeket az adatokat. */

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /* A metódus visszaadja a kategória adatait egy asszociatív tömbben, amely tartalmazza a kategória azonosítóját, nevét és színét. */
        return [
            "id" => $this->id,
            "name" => $this->name,
            "color" => $this->color
        ];
    }
}
