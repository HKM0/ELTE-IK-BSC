<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>új könyv rögzítése</title>
    <style>
        body { font-family: sans-serif; padding: 20px; max-width: 600px; }
        div { margin-bottom: 15px; }
        label { display: block; font-weight: bold; margin-bottom: 5px; }
        input, select { width: 100%; padding: 8px; }
        .error { color: red; font-size: 0.9em; margin-top: 5px; }
    </style>
</head>
<body>
    <h1>új könyv felvétele</h1>

    <form action="{{ route('books.store') }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div>
            <label>cím *</label>
            <input type="text" name="title" value="{{ old('title') }}">
            @error('title') <div class="error">{{ $message }}</div> @enderror
        </div>

        <div>
            <label>szerző *</label>
            <input type="text" name="writer" value="{{ old('writer') }}">
            @error('writer') <div class="error">{{ $message }}</div> @enderror
        </div>

        <div>
            <label>típus *</label>
            <select name="type">
                <option value="">válassz...</option>
                @foreach(['könyv', 'folyóirat', 'kotta', 'térkép', 'képregény'] as $t)
                    <option value="{{ $t }}" {{ old('type') == $t ? 'selected' : '' }}>{{ ucfirst($t) }}</option>
                @endforeach
            </select>
            @error('type') <div class="error">{{ $message }}</div> @enderror
        </div>

        <div>
            <label>kiadás éve * (max 2026)</label>
            <input type="number" name="year" value="{{ old('year') }}">
            @error('year') <div class="error">{{ $message }}</div> @enderror
        </div>

        <div>
            <label>Nyelv *</label>
            <select name="language">
                <option value="">Válassz...</option>
                @foreach(['hu', 'en', 'de', 'fr', 'it', 'ru', 'es', 'la', 'pl'] as $l)
                    <option value="{{ $l }}" {{ old('language') == $l ? 'selected' : '' }}>{{ strtoupper($l) }}</option>
                @endforeach
            </select>
            @error('language') <div class="error">{{ $message }}</div> @enderror
        </div>

        <div>
            <label>ISBN (13 szám kötőjel nélkül) *</label>
            <input type="text" name="isbn" value="{{ old('isbn') }}">
            @error('isbn') <div class="error">{{ $message }}</div> @enderror
        </div>

        <div>
            <label>Borítókép (opcionális)</label>
            <input type="file" name="cover_image" accept="image/*">
            @error('cover_image') <div class="error">{{ $message }}</div> @enderror
        </div>

        <button type="submit">Könyv mentése</button>
        <a href="{{ route('books.index') }}">Mégsem</a>
    </form>
</body>
</html>