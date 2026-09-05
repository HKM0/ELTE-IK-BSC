{{-- Ez egy Blade sablon, amely egy konkrét blogbejegyzést jelenít meg. --}}

@extends('bloglayout')

@section('title', $post->title)

@section('content')
    <h2 class="text-xl">{{ $post->title }}</h2>

    <i>{{ $post->author->name }}</i>
    {{-- Ha a bejegyzéshez kép van feltöltve, megjeleníti azt.
    A Storage::disk('public')->url() metódus segítségével generálja a kép URL-jét,
    amely a public disk meghajtó gyökerére mutat. A képek a storage/app/public/images könyvtárban vannak tárolva, és a public disk meghajtó konfigurációja szerint elérhetőek lesznek a public/storage/images URL-en keresztül. A symlink generálása: php artisan storage:link. Azért generálunk symlinket, hogy a fájlok elérhetők legyenek a webes kiszolgáló számára. Biztonsági okokból a fájlokat a storage könyvtárban tároljuk, és a public/storage könyvtár egy szimbolikus link a storage/app/public könyvtárra. Így a fájlok fizikailag a storage/app/public/images könyvtárban vannak, de a webes kiszolgáló a public/storage/images URL-en keresztül éri el őket. --}}

    @if ($post->image !== null)
        <img src="{{ Storage::disk('public')->url('images/' . $post->image) }}" alt="">
    @endif

    <br>
    {{ $post->content }}
    {{-- A @can direktíva segítségével ellenőrizzük, hogy a jelenlegi felhasználó jogosult-e a bejegyzés szerkesztésére vagy törlésére. Ha igen, megjelenítjük a megfelelő linkeket. A @can direktíva a Laravel beépített jogosultságkezelő rendszerét használja, amely lehetővé teszi a jogosultságok egyszerű ellenőrzését a nézetekben. A 'update' és 'delete' jogosultságokat a PostPolicy osztályban definiáljuk (jövőő órára csúszott át), ahol meghatározzuk, hogy mely felhasználók jogosultak szerkeszteni vagy törölni egy adott bejegyzést.
 @method('DELETE'): Ez egy Blade direktíva, amely egy rejtett input mezőt generál a formában, amely jelzi, hogy a HTTP kérés DELETE módszerrel történik. Mivel a HTML formák csak GET és POST módszereket támogatnak, a Laravel ezt a direktívát használja a többi HTTP módszer (PUT, PATCH, DELETE) szimulálására. Amikor a form elküldésre kerül, a Laravel felismeri a rejtett input mezőt, és megfelelően kezeli a kérést a megadott HTTP módszerrel. method spoofing technika a neve.
 A <a href="#" onclick="this.closest('form').submit()">Törlés</a> link egy JavaScript eseménykezelőt használ, amely a legközelebbi form elemre hivatkozik (this.closest('form')) és elküldi azt (submit()) amikor a linkre kattintanak. Ez lehetővé teszi, hogy a törlés műveletet egy link segítségével hajtsuk végre, miközben a form POST módszerét használjuk a DELETE művelet szimulálására. Azért nem GET-et használunk a törléshez, mert a RESTful API tervezési elvei szerint a GET kéréseknek nem szabad módosító műveleteket végrehajtaniuk, mivel ezeknek idempotensnek kell lenniük (nem szabad megváltoztatniuk az erőforrás állapotát). A POST, PUT, PATCH és DELETE módszerek használata lehetővé teszi a megfelelő HTTP műveletek szimulálását és a RESTful API tervezési elveinek betartását.
 --}}
    @can('update', $post)
        <a href="{{ route('posts.edit', ['post' => $post]) }}">Szerkesztés</a>
    @endcan
    @can('delete', $post)
        <form action="{{ route('posts.destroy', ['post' => $post]) }}" method="POST">
            @csrf
            @method('DELETE')
            <a href="#" onclick="this.closest('form').submit()">Törlés</a>
        </form>
    @endcan

@endsection
