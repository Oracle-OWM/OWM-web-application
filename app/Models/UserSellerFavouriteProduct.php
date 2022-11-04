<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSellerFavouriteProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'is_seller',
        'user_id',
        'product_id',
    ];
}
