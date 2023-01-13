<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersDevice extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 'device_id',
        'created_at', 'updated_at',
    ];


    protected $hidden = [
        'created_at', 'updated_at',
    ];
}
