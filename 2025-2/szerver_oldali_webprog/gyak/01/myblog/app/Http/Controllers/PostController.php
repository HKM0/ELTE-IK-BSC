<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    //
    public function index()
    {
        //$posts = Post::all();
        $posts = Post::with('author')->get();
        return view('posts.index', ["posts"=>$posts]);
    }
}
