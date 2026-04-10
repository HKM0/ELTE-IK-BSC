{{-- index.blade.php (konkrét oldal tartalma) az elnevezési konvenció: Blade nézetfájl, ami a főoldal tartalmát írja le --}}
@extends('bloglayout')
{{-- Ez a nézet a bloglayout.blade.php sablont használja alapként. Tehát van egy fájl: resources/views/bloglayout.blade.php, ami tartalmazza a html vázat. A Laravel automatikusan a resources/views mappában keres minden view fájlt, tehát a @extends('bloglayout') sor azt jelenti, hogy a views mappában keresi a bloglayout.blade.php fájlt. Ha egy layouts mappában lenne, akkor ezt kell írnom: @extends('layouts.bloglayout') A Blade motor a blade.php kiterjesztést automatikusan hozzáteszi. --}}
{{-- Ez a sor a @yield('title') helyére írja be a címet: --}}
@section('title', 'Kezdőlap')
{{-- Ez a blokk tölti ki a @yield('content') részt a layoutban.
Egy listában megjeleníti az összes bejegyzés címét + szerzőjét,  a bejegyzés oldalára mutató hivatkozással. A $posts egy Eloquent gyűjtemény, amit a controller küldött át a nézetnek.
A ciklus  végigmegy az összes bejegyzésen (post-on), és mindegyikhez létrehoz egy listatelemet.
A route() egy globális Laravel függvény, ami a route nevet URL-re alakítja. Pl route('posts.show', 5): http://localhost:8000/posts/5.
{{ route('posts.show', ['post' => $post]) }}:  A ['post' => $post] automatikusan azonosítja a rekordot az ID alapján). --}}
@section('content')
{{-- Ha van a session-ben 'post-created' kulcs, akkor megjelenít egy zöld háttérrel rendelkező értesítést, ami a létrehozott poszt címét tartalmazza. Ez egy flash üzenet, ami csak egyszer jelenik meg a következő oldalbetöltéskor, majd eltűnik. --}}
    @if (Session::has('post-created'))
        <div class="bg-green-300 rounded mb-2 py-2 text-center">
            {{--Session::get('post-created') kiolvassa a sessionből a post-created értékét--}}
            A(z) {{ Session::get('post-created') }} című bejegyzés létrehozva!
        </div>
    @endif

    <ul>
        @foreach ($posts as $post)
            <li><a href="{{ route('posts.show', ['post' => $post]) }}">
                    {{ $post->title }}</a> {{ $post->author->name }}</li>
        @endforeach

    </ul>
{{-- A links() metódus megjeleníti a lapozó gombokat, amik a paginate() által létrehozott Paginator objektum részei. Ez lehetővé teszi a felhasználók számára, hogy navigáljanak a posztok között, ha több poszt van, mint amennyi egy oldalon megjelenik (jelen esetben 10). --}}
    {{ $posts->links() }}
@endsection