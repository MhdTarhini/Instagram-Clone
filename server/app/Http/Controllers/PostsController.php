<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostsController extends Controller
{

    function CreatPost(Request $request) {
    $post = new Post;
    $post->user_id = Auth::user()->id;
    $post->content = $request->content ?: "";
    
    if ($request->has('image')) {
        $imageData = $request->input('image');
        $decodedImage = base64_decode($imageData);
        $imageName = uniqid() . '.png'; 
        $imagePath = public_path("images/" . $imageName);

        file_put_contents($imagePath, $decodedImage);

        $post->image = $imageName; 
    }
    
    $post->save();

    return response()->json([
        "status" => "success", 
        "data" => $post
    ]);
}


    function GetUserFollowingPosts() {
        $auth_user=Auth::user();
        $following=$auth_user->following()->pluck('following_id')->toArray();
        $following[] = $auth_user->id;
        $following_posts = Post::whereIn('user_id', $following)->with('Users')->withCount('Likes')->get();

        return response()->json([
            "status" => "success", 
            "data" => $following_posts
        ]);
    }
    function GetPostLikes($id) {
        $post=Post::find($id);
        $post_likes = $post->Likes()->get();
        return response()->json([
            "status" => "success", 
            "data" => $post_likes
        ]);
    }
}
