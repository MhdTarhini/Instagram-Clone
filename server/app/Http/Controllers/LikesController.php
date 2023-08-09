<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikesController extends Controller
{
    function addLike($id) {
        $like=new Like;
        $like->post_id =$id;
        $$like->user_id = Auth::user()->id;
        $like->save();
        return response()->json([
            "status" => "success",
        ]);
        
    }
    function removeLike($id) {
        $post_id=Post::find($id);
        $auth_user = Auth::user();
        $like=Like::where("post_id",$post_id)->where("user_id", $auth_user->id)->first();
        $like->delete();
        return response()->json([
            "status" => "success", 
        ]);
        
    }
}
