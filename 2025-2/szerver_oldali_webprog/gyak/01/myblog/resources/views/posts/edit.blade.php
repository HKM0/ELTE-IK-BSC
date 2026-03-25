@extends('bloglayout')

@section('title', 'Bejegyzés szerkesztése')

@section('content')

    <h2 class="text-2xl">
        Bejegyzés szerkesztése</h2>

    <form action="{{ route('posts.update', $post) }}" method="POST">
        @csrf
        @method('PUT')
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
        Szerző:
        <select name="author_id">
            @foreach ($users as $user)
                <option value="{{ $user->id }}" {{ old('author_id', $post->author_id) == $user->id ? 'selected' : '' }}>{{ $user->name }}</option>
            @endforeach
        </select><br>
        Publikus? <input type="checkbox" name="is_public" {{ old('is_public', $post->is_public) ? 'checked' : '' }}><br>

        <h3 class="text-xl">Kategóriák</h3>
        @foreach ($categories as $category)
            <input type="checkbox" class="mr-2" name="categories[]" value="{{ $category->id }}" 
                {{ in_array($category->id, old('categories', $post->categories->pluck('id')->toArray())) ? 'checked' : '' }}>
            <span style="color: {{ $category->color }}">{{ $category->name }}</span><br>
        @endforeach

        <button class="mt-2 p-2 bg-sky-500 hover:bg-sky-400 rounded rounded-lg" type="submit">Frissítés</button>
    </form>

@endsection
