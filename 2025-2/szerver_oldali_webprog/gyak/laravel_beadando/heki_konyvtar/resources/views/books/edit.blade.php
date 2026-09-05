<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>Könyv módosítása</title>
    <style>
        body { font-family: sans-serif; padding: 20px; max-width: 600px; }
        div { margin-bottom: 15px; }
        label { display: block; font-weight: bold; margin-bottom: 5px; }
        input, select { width: 100%; padding: 8px; }
        .error { color: red; font-size: 0.9em; margin-top: 5px; }
        .current-image { max-width: 150px; margin-bottom: 10px; display: block; border: 1px solid #ccc; } 
    </style>
</head>
<body>
    <h1>Könyv módosítása: {{ $book->title }}</h1>

    <form action="{{ route('books.update', $book) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <div>
            <label>Cím *</label>
            <input type="text" name="title" value="{{ old('title', $book->title) }}">
            @error('title') <div class="error">{{ $message }}</div> @enderror
        </div>

        <div>
            <label>Szerző *</label>
            <input type="text" name="writer" value="{{ old('writer', $book->writer) }}">
            @error('writer') <div class="error">{{ $message }}</div> @enderror
        </div>

        <div>
            <label>Típus *</label>
            <select name="type">
                @foreach(['könyv', 'folyóirat', 'kotta', 'térkép', 'képregény'] as $t)
                    <option value="{{ $t }}" {{ old('type', $book->type) == $t ? 'selected' : '' }}>{{ ucfirst($t) }}</option>
                @endforeach
            </select>
            @error('type') <div class="error">{{ $message }}</div> @enderror
        </div>

        <div>
            <label>Kiadás éve *</label>
            <input type="number" name="year" value="{{ old('year', $book->year) }}">
            @error('year') <div class="error">{{ $message }}</div> @enderror
        </div>

        <div>
            <label>Nyelv *</label>
            <select name="language">
                @foreach(['hu', 'en', 'de', 'fr', 'it', 'ru', 'es', 'la', 'pl'] as $l)
                    <option value="{{ $l }}" {{ old('language', $book->language) == $l ? 'selected' : '' }}>{{ strtoupper($l) }}</option>
                @endforeach
            </select>
            @error('language') <div class="error">{{ $message }}</div> @enderror
        </div>

        <div>
            <label>ISBN *</label>
            <input type="text" name="isbn" value="{{ old('isbn', $book->isbn) }}">
            @error('isbn') <div class="error">{{ $message }}</div> @enderror
        </div>

        <div>
            <label>Jelenlegi borítókép</label>
            @if($book->cover_image)
                <img src="{{ Storage::url($book->cover_image) }}" alt="Borítókép" class="current-image">
            @else
                <span>Nincs feltöltve kép.</span>
            @endif
            
            <label style="margin-top: 10px;">Új borítókép (opcionális, felülírja a régit!)</label>
            <input type="file" name="cover_image" accept="image/*">
            @error('cover_image') <div class="error">{{ $message }}</div> @enderror
        </div>

        <button type="submit" style="background: blue; color: white; padding: 10px; border: none; cursor: pointer;">Mentés</button>
        <a href="{{ route('books.show', $book) }}" style="margin-left: 10px;">Mégsem</a>
    </form>
</body>
</html>