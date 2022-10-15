<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'category_id',
        'car_model_id',
        'store_name',
        'price',
        'offer_percentage',
        'desc',
        'rate',
    ];

    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function carModel() {
        return $this->belongsTo(CarModel::class, 'car_model_id');
    }
}
