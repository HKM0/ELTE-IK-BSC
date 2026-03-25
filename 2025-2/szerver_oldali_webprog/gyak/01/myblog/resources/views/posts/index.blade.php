@extends('bloglayout')

@section('title', "Kezdőlap")

@section('content')
    <ul>
        @foreach($posts as $post)
            <li>
                <a href="{{ route('posts.show', ['post' => $post ]) }}">
                {{ $post->title }}</a> {{ $post->author->name }} </li> 

            </li>
        @endforeach
    </ul>
@endsection