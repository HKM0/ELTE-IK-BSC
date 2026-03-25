@extends('bloglayout')

@section('title', $post -> title)

@section('content')
<h2 class="text-xl">{{ $post -> title }}</h2>
<i>{{ $post -> author -> name }}</i>
<br>
{{ $post -> content }}
@endsection
