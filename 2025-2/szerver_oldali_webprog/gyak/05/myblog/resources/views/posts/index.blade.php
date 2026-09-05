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
    <ul>
        @foreach ($posts as $post)
            <li><a href="{{ route('posts.show', ['post' => $post]) }}">
                    {{ $post->title }}</a> {{ $post->author->name }}</li>
        @endforeach

    </ul>
@endsection
