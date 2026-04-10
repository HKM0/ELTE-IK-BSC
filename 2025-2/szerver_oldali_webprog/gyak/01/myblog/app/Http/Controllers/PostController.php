<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostStoreOrUpdateRequest;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Facades\Session;
//Két Session osztály is van, mi most ezt választottuk a flash miatt.

class PostController extends Controller
{
    //
    public function index()
    {
        //$posts = Post::all();
        //$posts = Post::with('author')->get();
        //A paginate() Paginator objektumot ad vissza, ami a posztok egy részét tartalmazza, és információkat a lapozáshoz. A view-ban a links() metódussal megjeleníthetjük a lapozó gombokat. Ezzel elkerüljük, hogy egyszerre túl sok posztot töltsünk be, ami lassíthatná az oldalt.Dokumentáció: https://laravel.com/docs/12.x/pagination
        
        $posts = Post::with('author')->paginate(10);
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

    public function store(PostStoreOrUpdateRequest $request){
      //dd(session('_token'));
      $validated = $request->validated();
      $validated['is_public'] = $request -> has('is_public');
      $post = Post::create($validated);
      $post -> categories() -> sync($validated['categories'] ?? []);
      Session::flash('post-created', $post->title);
      return redirect() -> route('posts.index');
    }

    public function edit(Post $post){
       return view('posts.edit', [
           'post' => $post,
           'users' => User::all(),
          'categories' => Category::all()
       ]);
    }

    public function update(PostStoreOrUpdateRequest $request, Post $post){
      $validated = $request->validated();
     $validated['is_public'] = $request -> has('is_public');
      $post->update($validated);
      $post -> categories() -> sync($validated['categories'] ?? []);
      return redirect() -> route('posts.show', $post);
    }


}
