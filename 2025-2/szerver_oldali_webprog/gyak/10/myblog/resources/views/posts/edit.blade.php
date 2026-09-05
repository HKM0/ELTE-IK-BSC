@extends('bloglayout')

@section('title', $post->title . ' szerkesztése')

@section('content')

    <h2 class="text-2xl">{{ $post->title }} szerkesztése</h2>

    <form action="{{ route('posts.update', ['post' => $post]) }}" method="POST">
        @csrf
        @method('PATCH')
        Cím: @error('title')
            {{ $message }}
        @enderror
        <br>
        <input type="text" name="title" value="{{ old('title', $post->title) }}" class="w-full"><br>
        Tartalom: @error('content')
            {{ $message }}
        @enderror
        <br>
        <textarea rows="5" name="content" class="w-full">{{ old('content', $post->content) }}</textarea><br>
        <br>
        Kép: @error('image_file')
            {{ $message }}
        @enderror

        Kép: <input type="file" name="image_file"><br>
        Publikus? <input type="checkbox" name="is_public" {{ old('is_public', $post->is_public) ? 'checked' : '' }}><br>

        <h3 class="text-xl">Kategóriák</h3>
        {{-- Ez a kódrészlet több lépésből álló Eloquent + Collection feldolgozás, amit azért használunk, hogy az edit formban a már kiválasztott kategóriák előre be legyenek pipálva. A $post->categories->pluck('id')->toArray() kifejezés a posthoz tartozó kategóriák ID-it tartalmazó tömböt ad vissza, amelyet az in_array() használ arra, hogy eldöntse, egy adott kategória checkboxa legyen-e előre kijelölve.
        $post->categories: Ez az Eloquent kapcsolat lekéri a posthoz tartozó kategóriákat, ami egy Collection objektumot ad vissza.
        ->pluck('id'): Ez a Collection metódus egy új gyűjteményt hoz létre, ami csak a kategóriák ID-it tartalmazza.
        ->toArray(): Ez a metódus a Collection-t egy sima PHP tömbbé alakítja, ami könnyen használható az in_array() függvényben. Az in_array() pedig ellenőrzi, hogy a jelenlegi kategória ID-je szerepel-e ebben a tömbben, és ha igen, akkor a checkbox előre ki lesz jelölve (checked).
        Ez a megoldás biztosítja, hogy amikor egy poszt szerkesztésekor visszatérünk a formra, akkor a már kiválasztott kategóriák checkboxai előre ki legyenek jelölve, így könnyebben látható, hogy mely kategóriák vannak hozzárendelve a poszthoz. --}}
        @foreach ($categories as $category)
            <input type="checkbox" class="mr-2" name="categories[]" value="{{ $category->id }}"
                {{ in_array($category->id, old('categories', $post->categories->pluck('id')->toArray())) ? 'checked' : '' }}>
            <span style="color: {{ $category->color }}">{{ $category->name }}</span><br>
        @endforeach

        <button class="mt-2 p-2 bg-sky-500 hover:bg-sky-400 rounded rounded-lg" type="submit">Mentés</button>
    </form>

@endsection
