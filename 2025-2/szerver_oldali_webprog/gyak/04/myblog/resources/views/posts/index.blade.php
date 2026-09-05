@extends('bloglayout')

@section('title', 'Kezdőlap')

@section('content')
    <ul>
        @foreach ($posts as $post)
            <li><a href="">{{ $post->title }}</a> </li>
        @endforeach

    </ul>
@endsection
