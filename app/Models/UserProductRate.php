<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProductRate extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 'product_id', 'rate', 'is_seller',
    ];




}
