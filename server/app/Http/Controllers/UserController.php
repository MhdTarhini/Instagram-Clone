<?php


namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Post;

class UserController extends Controller
{
    function GetUserPosts() {
        $auth_user=Auth::user();
        $posts=$auth_user->Posts()->get();

        return response()->json([
            "status" => "success", 
            "data" => $posts
        ]);
    }
    function GetUserFollowing() {
        $auth_user=Auth::user();
        $following=$auth_user->Following()->pluck('following_id')->toArray();

        return response()->json([
            "status" => "success", 
            "data" => $following
        ]);
    }

    public function searchUser(Request $request) {
    $query = $request->query('query');
    $users = User::where('name', 'like', "%$query%")->get();
    
    return response()->json([
        "status" => "success", 
        "data" => $users
    ]);
}

}
