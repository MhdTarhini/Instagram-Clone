<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'content',
        'image',
    ];

    // public function scopePost($query ,$id){
    //     return $query->where("id", $id);
    // }
    public function Users(){
        return $this->belongsTo(User::class,"user_id");
    }


    public function Likes()
    {
        return $this->hasMany(Like::class,'post_id');
    }
}
