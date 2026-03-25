@extends('bloglayout')

@section('title', 'Új bejegyzés létrehozása')

@section('content')

    <h2 class="text-2xl">
        Új bejegyzés létrehozása</h2>

    <form action="{{ route('posts.store') }}" method="POST">
        @csrf
        Cím: @error('title')
            {{ $message }}
        @enderror
        <br>
        <input type="text" name="title" value="{{ old('title', '') }}" class="w-full"><br>
        Tartalom: @error('content')
            {{ $message }}
        @enderror
        <br>
        <textarea rows="5" name="content" class="w-full">{{ old('content', '') }}</textarea><br>
        Szerző:
        <select name="author_id">
            @foreach ($users as $user)
                <option value="{{ $user->id }}">{{ $user->name }}</option>
            @endforeach
        </select><br>
        Publikus? <input type="checkbox" name="is_public"><br>

        <h3 class="text-xl">Kategóriák</h3>
        @foreach ($categories as $category)
            <input type="checkbox" class="mr-2" name="categories[]" value="{{ $category->id }}">
            <span style="color: {{ $category->color }}">{{ $category->name }}</span><br>
        @endforeach

        <button class="mt-2 p-2 bg-sky-500 hover:bg-sky-400 rounded rounded-lg" type="submit">Mentés</button>
    </form>

@endsection
