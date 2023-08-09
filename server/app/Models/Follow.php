<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    use HasFactory;
     protected $fillable = [
        'follower_id',
        'following_id',
    ];

    public function scopePosts($query,$id){
        return $query->where("following_id",$id);
    }
    public function scopeFollower($query,$id){
        return $query->where("follower_id",$id);
    }
    public function follower()
    {
        return $this->belongsTo(User::class, 'follower_id');
    }

    public function following()
    {
        return $this->belongsTo(User::class, 'follower_id');
    }
    public function followingPosts()
    {
        return $this->belongsToMany(Post::class,'following_id','user_id');
    }
}

