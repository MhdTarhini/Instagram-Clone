<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostsController extends Controller
{

    function CreatPost(Request $request) {
        $post=new Post;
        $post->user_id=Auth::user();
        $post->content=$request->content?:"";
        $post->image=$request->image;
        return response()->json([
            "status" => "success", 
            "data" => $post
        ]);
    }


    function GetUserFollowingPosts() {
        $auth_user=Auth::user();
        $following=$auth_user->following()->pluck('following_id');
        $following_posts = Post::whereIn('user_id', $following)->with('users')->withCount('likes')->get();

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
