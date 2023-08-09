<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostsController extends Controller
{
    function GetUserFollowingPosts() {
        $auth_user=Auth::user();
        $following=$auth_user->following()->pluck('following_id');
        $following_posts = Post::whereIn('user_id', $following)->with('users')->get();

        return response()->json([
            "status" => "success", 
            "data" => $following_posts
        ]);
    }
}
