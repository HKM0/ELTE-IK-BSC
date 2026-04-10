{{-- Ez egy Blade view, egy új blogbejegyzés létrehozására szolgáló űrlapot jelenít meg, validációs hibakezeléssel, CSRF-védelemmel és many-to-many kategória-választással. --}}
{{-- ): az oldal a bloglayout.blade.php layoutot használja, amely a teljes HTML oldalszerkezetet biztosítja. --}}
@extends('bloglayout')

{{-- Beállítja az oldal címét, amely a layoutban lévő @yield('title') helyére kerül. --}}

@section('title', 'Új bejegyzés létrehozása')
{{-- Elkezdi a fő tartalmi szekciót, amelyet a layout a megfelelő helyre illeszt. --}}
@section('content')
    {{-- Megjeleníti az oldal fejlécét nagyobb betűmérettel (Tailwind CSS osztály). --}}
    <h2 class="text-2xl">
        Új bejegyzés létrehozása</h2>
    {{-- Űrlapot hoz létre, amely POST kérést küld a posts.store nevű route-ra. „Állítsd be az űrlap action attribútumát arra az URL-re,
amit a posts.store nevű route-hoz tartozó útvonal ad vissza.” A routes/web.php fájlban adtuk meg.
--}}
    <form action="{{ route('posts.store') }}" method="POST">
        {{-- @csrf: CSRF tokent szúr be az űrlapba, amely megvédi az alkalmazást a CSRF támadásoktól. Nélküle 419 hibakódot kapunk. A CSRF-védelem lényege, hogy a szerver ellenőrzi: a kérés tényleg a saját weboldalunkról indult-e. A token ennek bizonyítására szolgál. aravelben a token a szerver oldali sessionben van tárolva. A böngészőben nem a token tárolódik cookie-ban, hanem a session azonosító:
        csrf probléma: cross site request forgery támadás: https://laravel.com/docs/12.x/csrf. Minden kérés előtt lefut a Laravelben: vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/VerifyCsrfToken.php::class middleware, Laravel megnézi: van-e token mező az űrlapban, egyezik-e a sessionben tárolt tokennel. Ha nincs vagy nem egyezik: a kérés elutasításra kerül, Laravel 419 Page Expired hibát ad. Adunk egy tokent, amikor megjelenítem a formot, lesz benne egy token, ha én azt nem küldöm vissza, a másik nem beszél velem, a módosító műveleteket nem fogadja el token nélkül. Póbáljuk ki: Kitöltöm az űrlapot, mentem, létrejött a poszt. Ha ráfrissítek az oldalra, ezt látom a forrásban <input type="hidden" name="_token" value="f327aQAWQBaQS5mIW4irngxdMZyh7k7Rwabcj7lt"…
        A CSRF token nem azt bizonyítja, hogy ki a felhasználó, hanem azt, hogy a kérés a saját alkalmazás által generált űrlapból származik.
        Az azonosítást a session végzi, a CSRF token pedig a kérés eredetét védi. --}}
        @csrf
        {{-- Ha a cím mezőnél validációs hiba van, megjeleníti a hibaüzenetet. A hibaüzenetet, a message-t a Laravel adja. A Controllerben állítjuk be, a validate segítségével --}}
        Cím: @error('title')
            {{ $message }}
        @enderror
        <br>
        {{-- Szövegmező a címhez, amely hibás beküldés után visszatölti az előző értéket. Állapottartás. A Blade old() függvénye visszaadja az előző beküldés értékét. --}}
        <input type="text" name="title" value="{{ old('title', '') }}" class="w-full"><br>
        {{-- Megjeleníti a tartalom mezőhöz tartozó validációs hibát. --}}
        Tartalom: @error('content')
            {{ $message }}
        @enderror
        <br>
        {{-- Szövegmező a bejegyzés tartalmának megadásához, álllapottartással hiba esetén. --}}
        <textarea rows="5" name="content" class="w-full">{{ old('content', '') }}</textarea><br>
        Szerző:
        <select name="author_id">
            @foreach ($users as $user)
                <option value="{{ $user->id }}"{{ old('author_id', -1) == $user->id ? 'selected' : '' }}>
                    {{ $user->name }}</option>
            @endforeach
        </select><br>
        Publikus? <input type="checkbox" name="is_public" {{ old('is_public') ? 'checked' : '' }}><br>

        <h3 class="text-xl">Kategóriák</h3>
        {{-- Végigiterál az összes kategórián, amelyet a controller adott át a view-nak. --}}
        @foreach ($categories as $category)
            {{-- Lehetővé teszi több kategória kiválasztását (many-to-many kapcsolat). --}}
            <input type="checkbox" class="mr-2" name="categories[]" value="{{ $category->id }}"
                {{ in_array($category->id, old('categories', [])) ? 'checked' : '' }}>
            <span style="color: {{ $category->color }}">{{ $category->name }}</span><br>
        @endforeach

        <button class="mt-2 p-2 bg-sky-500 hover:bg-sky-400 rounded rounded-lg" type="submit">Mentés</button>
    </form>

@endsection