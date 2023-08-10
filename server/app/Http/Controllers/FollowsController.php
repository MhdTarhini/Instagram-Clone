<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowsController extends Controller
{
    function followUser($id){
        $auth_user=Auth::user();
        $follow = new Follow;
        $follow-> follower_id = $auth_user->id;
        $follow-> following_id = $id;
        $follow->save();

        return response()->json([
        "status" => "success", 
    ]);
    }
    function removeFollow($id){
        $auth_user=Auth::user();
        $follow = Follow::where("follower_id", $auth_user->id)
                    ->where("following_id", $id)
                    ->first();
        $follow->delete();
        return response()->json([
        "status" => "success", 
    ]);
    }
}
