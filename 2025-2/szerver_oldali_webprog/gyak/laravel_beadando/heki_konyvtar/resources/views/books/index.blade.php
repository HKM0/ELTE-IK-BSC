<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>Könyvtár - Főoldal</title>
    <style>
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid black; padding: 8px; text-align: left; }
        .filter-form { margin-bottom: 20px; border: 1px solid #ccc; padding: 15px; }
        .pagination { margin-top: 10px; }
        .pagination svg { width: 20px; }
    </style>
</head>
<body>
    <div style="text-align: right; padding: 10px; background: #f0f0f0; margin-bottom: 20px; border-bottom: 1px solid #ccc;">
        @auth
            <span style="margin-right: 15px;">Szia, <strong>{{ auth()->user()->name }}</strong>!</span>
            
            {{-- csakis admin-nak latszik --}}
            @if(auth()->user()->membership?->name === 'Adminisztrátor')
                <a href="{{ route('dashboard') }}" style="margin-right: 15px;">Irányítópult</a>
            @endif
            
            <a href="{{ route('profile.edit') }}" style="margin-right: 15px;">Profil</a>
            
            <form action="{{ route('logout') }}" method="POST" style="display: inline;">
                @csrf
                <button type="submit" style="background: none; border: none; color: blue; text-decoration: underline; cursor: pointer; font-size: 1em;">Kijelentkezés</button>
            </form>
        @else
            <a href="{{ route('login') }}" style="margin-right: 15px;">Bejelentkezés</a>
            <a href="{{ route('register') }}">Regisztráció</a>
        @endauth
    </div>
    
    <h1>Könyvek listája</h1>
    @if(session('success'))
        <div style="color: green; padding: 10px; border: 1px solid green; margin-bottom: 15px;">
            {{ session('success') }}
        </div>
    @endif

    @if(auth()->check() && auth()->user()->membership?->name === 'Adminisztrátor')
        <a href="{{ route('books.create') }}" style="display:inline-block; margin-bottom:15px; background:blue; color:white; padding:10px; text-decoration:none;">+ új könyv rögzítése</a>
    @endif

    <div class="filter-form">
        <form action="{{ route('books.index') }}" method="GET">
            <input type="text" name="writer" placeholder="Szerző" value="{{ request('writer') }}">
            <input type="text" name="title" placeholder="Cím" value="{{ request('title') }}">
            <input type="number" name="year" placeholder="Évszám" value="{{ request('year') }}">
            
            <select name="type">
                <option value="">Típus (összes)</option>
                @foreach(['könyv', 'folyóirat', 'kotta', 'térkép', 'képregény'] as $type)
                    <option value="{{ $type }}" {{ request('type') == $type ? 'selected' : '' }}>{{ ucfirst($type) }}</option>
                @endforeach
            </select>

            <select name="language">
                <option value="">Nyelv (összes)</option>
                @foreach(['hu', 'en', 'de', 'fr', 'it', 'ru', 'es', 'la', 'pl'] as $lang)
                    <option value="{{ $lang }}" {{ request('language') == $lang ? 'selected' : '' }}>{{ strtoupper($lang) }}</option>
                @endforeach
            </select>

            <button type="submit">Szűrés</button>
            <a href="{{ route('books.index') }}">Alaphelyzet</a>
        </form>
    </div>

    <table>
        <thead>
            <tr>
                <th>Szerző</th>
                <th>Cím</th>
                <th>Típus</th>
                <th>Kiadás éve</th>
            </tr>
        </thead>
        <tbody>
            @forelse($books as $book)
                <tr>
                    <td>{{ $book->writer }}</td>
                    <td><a href="{{ route('books.show', $book) }}">{{ $book->title }}</a></td>
                    <td>{{ $book->type }}</td>
                    <td>{{ $book->year }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="4">Nincs találat a megadott feltételek alapján.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="pagination">
        {{ $books->links() }}
    </div>
</body>
</html>