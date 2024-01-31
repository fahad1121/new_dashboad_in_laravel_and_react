<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalizeNewsFeed extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','category','source','author'];
}
