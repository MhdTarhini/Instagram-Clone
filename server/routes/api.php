<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FollowsController;
use App\Http\Controllers\LikesController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(["middleware" => "auth:api"], function(){
        Route::post("logout", [AuthController::class, "logout"]);
        Route::post("refresh", [AuthController::class, "refresh"]);
        Route::get("profile", [AuthController::class, "profile"]);

        Route::get("get_user_posts", [UserController::class, "GetUserPosts"]);
        Route::get("get_user_following", [UserController::class, "GetUserFollowing"]);
        Route::get("get_Following_posts", [PostsController::class, "GetUserFollowingPosts"]);
        Route::get('search_users', [UserController::class,'searchUser']);

        Route::get("get_post_likes/{id?}", [PostsController::class, "GetPostLikes"]);
        Route::post('create_post',[PostsController::class,"CreatPost"]);
        
        Route::get("add_like/{id?}",[LikesController::class,"addLike"]);
        Route::delete("remove_like/{id?}",[LikesController::class,"removeLike"]);
        Route::get('user_likes',[LikesController::class,"userIsLiked"]);

        Route::get('follow_user/{id?}',[FollowsController::class,"followUser"]);
        Route::get('follow_remove/{id?}',[FollowsController::class,"removeFollow"]);

});

Route::group(["prefix" => "guest"], function(){
    Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
    Route::post("login", [AuthController::class, "login"]);
    Route::post("register", [AuthController::class, "register"]);
});