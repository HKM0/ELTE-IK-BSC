<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>{{ $book->title }} - Részletek</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }
        .cover-image { max-width: 200px; border: 1px solid #ccc; padding: 5px; }
        .admin-box { border: 2px dashed red; padding: 15px; margin-top: 20px; background: #fff0f0; }
        .status { font-weight: bold; padding: 10px; margin-top: 15px; display: inline-block; }
        .status.available { background: #d4edda; color: #155724; }
        .status.unavailable { background: #f8d7da; color: #721c24; }
    </style>
</head>
<body>
    <h1>{{ $book->writer }}: {{ $book->title }}</h1>
    @if(session('error'))
        <div style="color: red; padding: 10px; border: 1px solid red; margin-bottom: 15px; background: #ffe6e6;">
            {{ session('error') }}
        </div>
    @endif
    @if(session('success'))
        <div style="color: green; padding: 10px; border: 1px solid green; margin-bottom: 15px; background: #e6ffe6;">
            {{ session('success') }}
        </div>
    @endif

    <div>
        @if($book->cover_image)
            <img src="{{ Storage::url($book->cover_image) }}" alt="Borítókép" class="cover-image">
        @else
            <img src="https://placehold.co/200x300/png?text=Nincs+boritokep" alt="Placeholder" class="cover-image">
        @endif
    </div>

    <ul>
        <li><strong>Dokumentum típusa:</strong> {{ ucfirst($book->type) }}</li>
        <li><strong>Kiadás éve:</strong> {{ $book->year }}</li>
        <li><strong>Nyelv:</strong> {{ strtoupper($book->language) }}</li>
        <li><strong>ISBN:</strong> {{ $book->isbn }}</li>
    </ul>

    <h2>Elérhetőség</h2>
    @if($activeLoan)
        <div class="status unavailable">
            Jelenleg kikölcsönözve.<br>
            Várhatóan elérhető lesz újra: <strong>{{ $activeLoan->pivot->deadline_date }}</strong>
        </div>
        
        @auth
            @if(auth()->id() === $activeLoan->id && !$activeLoan->pivot->is_extended)
                <div style="margin-top: 15px;">
                    <form action="{{ route('books.extend', [auth()->user(), $book]) }}" method="POST">
                        @csrf
                        <button type="submit" style="background: #17a2b8; color: white; padding: 10px; border: none; cursor: pointer;">Kölcsönzés hosszabbítása (+30 nap)</button>
                    </form>
                </div>
            @endif
        @endauth

    @elseif($activeReservation)
        <div class="status unavailable">
            A könyv jelenleg elő van jegyezve.
        </div>
        
        @auth
            @if(auth()->id() === $activeReservation->id)
                <div style="margin-top: 15px;">
                    <form action="{{ route('books.cancel_reservation', $book) }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button type="submit" style="background: darkred; color: white; padding: 10px; border: none; cursor: pointer;">Saját előjegyzés törlése</button>
                    </form>
                </div>
            @endif
        @endauth

    @else
        <div class="status available">
            Kikölcsönözhető!
        </div>
    @endif

    @auth
        @if(!$activeReservation)
            <div style="margin-top: 15px;">
                <form action="{{ route('books.reserve', $book) }}" method="POST">
                    @csrf
                    <button type="submit" style="background: darkblue; color: white; padding: 10px; border: none; cursor: pointer;">Előjegyzés (300 Ft)</button>
                </form>
            </div>
        @endif
    @endauth

    @if(auth()->check() && auth()->user()->membership?->name === 'Adminisztrátor')
        <div class="admin-box">
            <h3>Admin panel</h3>
            <p>
                <strong>Előjegyzés státusza:</strong> 
                @if($activeReservation)
                    <span style="color: red;">Előjegyezve - {{ $activeReservation->name }} (id: {{ $activeReservation->id }})</span>
                    
                    <form action="{{ route('books.cancel_reservation', $book) }}" method="POST" style="display: inline-block; margin-left: 15px;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" style="background: darkred; color: white; border: none; padding: 4px 8px; cursor: pointer;">Előjegyzés törlése</button>
                    </form>
                @else
                    <span style="color: green;">Nincs rajta előjegyzés.</span>
                @endif
            </p>

            <div style="margin-top: 15px; display: flex; gap: 10px;">
                <a href="{{ route('books.edit', $book) }}" style="background: blue; color: white; padding: 8px 12px; text-decoration: none;">Módosítás</a>
                
                <form action="{{ route('books.destroy', $book) }}" method="POST" onsubmit="return confirm('Biztosan archiválod a könyvet?');">
                    @csrf
                    @method('DELETE')
                    <button type="submit" style="background: orange; border: none; padding: 8px 12px; cursor: pointer; font-size: 1em;">Archiválás</button>
                </form>

                <form action="{{ route('books.force_destroy', $book) }}" method="POST" onsubmit="return confirm('Biztosan végleg törlöd a könyvet?');">
                    @csrf
                    @method('DELETE')
                    <button type="submit" style="background: darkred; color: white; border: none; padding: 8px 12px; cursor: pointer; font-size: 1em;">Törlés</button>
                </form>
            </div>
            <hr style="margin: 15px 0;">

            <h4>Kölcsönzés kezelése</h4>

            @if($activeLoan)
                <p>Kikölcsönözte: <strong>{{ $activeLoan->name }}</strong> (Határidő: {{ $activeLoan->pivot->deadline_date }})</p>
                
                <form action="{{ route('books.return', $book) }}" method="POST" onsubmit="return confirm('Biztosan visszahozta a könyvet?');">
                    @csrf
                    @method('PATCH')
                    <button type="submit" style="background: green; color: white; border: none; padding: 8px 12px; cursor: pointer; font-size: 1em;">Könyv visszahozása</button>
                </form>
            @elseif($activeReservation)
                <p>A könyvet előjegyezte: <strong>{{ $activeReservation->name }}</strong></p>

                <form action="{{ route('books.borrow', $book) }}" method="POST">
                    @csrf
                    <input type="hidden" name="user_id" value="{{ $activeReservation->id }}">
                    <button type="submit" style="background: darkblue; color: white; border: none; padding: 8px 12px; cursor: pointer; font-weight: bold;">Kiadás az előjegyzőnek</button>
                </form>
            @else
                <form action="{{ route('books.borrow', $book) }}" method="POST">
                    @csrf
                    <label for="user_id">Felhasználó kiválasztása:</label>
                    <select name="user_id" id="user_id" required style="padding: 5px; margin-right: 10px;">
                        <option value="">-- Válassz --</option>
                        @foreach($users as $user)
                            <option value="{{ $user->id }}">
                                {{ $user->name }} ({{ $user->email }})
                            </option>
                        @endforeach
                    </select>
                    <button type="submit" style="background: blue; color: white; border: none; padding: 8px 12px; cursor: pointer;">Kikölcsönzés</button>
                </form>
            @endif
        </div>
    @endif

    <br><br>
    <a href="{{ route('books.index') }}"> Vissza a könyv listához</a>

</body>
</html>