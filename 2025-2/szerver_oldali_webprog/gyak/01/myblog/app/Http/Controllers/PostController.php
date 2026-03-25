<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Category;


class PostController extends Controller
{
    //
    public function index()
    {
        //$posts = Post::all();
        $posts = Post::with('author')->get();
        return view('posts.index', ["posts"=>$posts]);
    }
    public function show(Post $post){
        return view('posts.show', ['post' => $post]);
    }
    public function create(){
       return view('posts.create', [
           'users' => User::all(),
          'categories' => Category::all()
       ]);
    }

    public function store(Request $request){
      $validated = $request -> validate([
          'title' => 'required|string',
          'content' => 'required|string|min:10',
         'author_id' => 'required|integer|exists:users,id',
         'categories' => 'array',
         'categories.*' => 'integer|distinct|exists:categories,id'
      ], [
         'content.min' => 'A tartalom legalább 10 karakter kell legyen!'
      ]);
     $validated['is_public'] = $request -> has('is_public');
      $post = Post::create($validated);
      $post -> categories() -> sync($validated['categories'] ?? []);
      return redirect() -> route('posts.index');
    }

    public function edit(Post $post){
       return view('posts.edit', [
           'post' => $post,
           'users' => User::all(),
          'categories' => Category::all()
       ]);
    }

    public function update(Request $request, Post $post){
      $validated = $request -> validate([
          'title' => 'required|string',
          'content' => 'required|string|min:10',
         'author_id' => 'required|integer|exists:users,id',
         'categories' => 'array',
         'categories.*' => 'integer|distinct|exists:categories,id'
      ], [
         'content.min' => 'A tartalom legalább 10 karakter kell legyen!'
      ]);
     $validated['is_public'] = $request -> has('is_public');
      $post->update($validated);
      $post -> categories() -> sync($validated['categories'] ?? []);
      return redirect() -> route('posts.show', $post);
    }


}
