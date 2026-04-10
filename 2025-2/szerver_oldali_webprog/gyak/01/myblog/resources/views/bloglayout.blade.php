<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Document @yield('title') </title>
    @vite(['resources//css/app.css', 'resources/js/app.js'])
</head>
<body>
<div class="mx-auto container">
    <div class="grid grid-cols-3">
         <div class="col-span-3">
            <h1>myBlog</h1>
         </div>

         <div class="col-span-2">
            @yield('content')
         </div>
         
         <div class="col-span-1">
            <h1> sidebar </h1>
                {{-- A statikus sidebar szót lecseréltük a regisztrációs/ki-bejelentkezős rész megjelenítésére. @guest és @auth direktívák: a @guest blokk csak akkor jelenik meg, ha a felhasználó nincs bejelentkezve, míg a @auth blokk csak akkor, ha be van jelentkezve. --}}
                @guest
                    <a href="{{ route('login') }}">Bejelentkezés</a><br>
                    <a href="{{ route('register') }}">Regisztráció</a>
                @endguest

                @auth
                    Szia, {{ Auth::user()->name }}!
                    <form action="{{ route('logout') }}" method="POST">
                        @csrf
                        {{-- A kijelentkezés egy POST kérés, mert megváltoztatja a szerver állapotát (a session-t), ezért nem használhatunk sima linket, GET metódust. Ez egy biztonsági gyakorlat, hogy a módosító műveletek ne legyenek GET kérések. --}}
                        <a href="#" onclick="this.closest('form').submit()">Kijelentkezés</a>
                    </form>
                @endauth
         </div>
    </div>
</div>
    
</body>
</html>