<?php

use App\Http\Controllers\AuthController;
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

        Route::get("get_post_likes/{id?}", [PostsController::class, "GetPostLikes"]);
        Route::post('create_post',[PostsController::class,"CreatPost"]);
        
        Route::post('add_like',[LikesController::class,"addLike"]);
        Route::delete('remove_like',[LikesController::class,"removeLike"]);

});

Route::group(["prefix" => "guest"], function(){
    Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
    Route::post("login", [AuthController::class, "login"]);
    Route::post("register", [AuthController::class, "register"]);
});