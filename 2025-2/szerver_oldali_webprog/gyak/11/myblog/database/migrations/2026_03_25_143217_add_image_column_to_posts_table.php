<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        /* Schema: a Laravel adatbázis-séma kezelője, Ezzel tudsz táblákat létrehozni, módosítani, törölni. Most nem create(), mert meglévő táblát módosítok. Blueprint: use Illuminate\Database\Schema\Blueprint; Ez egy „tervrajz” objektum, amivel megmondod:, milyen oszlopok legyenek, mit módosítasz.Hozzáad egy oszlopot, a nullable azért kell, mert régi rekordoknál nincs kép, hiba lenne. */

        Schema::table('posts', function (Blueprint $table) {
            //
            $table->string('image')->nullable();
        });
    }

    /**
     * Akkor fut le, ha ezt futtatom: php artisan migrate:rollback, akkor visszavonódik a változtatás, azaz törlődik az image oszlop.Tudnom kell visszavonnom minden migrációt, visszaállítani az előző állapotot.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn('image');
        });
    }
};
