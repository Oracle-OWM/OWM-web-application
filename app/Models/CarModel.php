<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarModel extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'car_manufacture',
        'car_year',
        'model_name',
        'image',
    ];
    use HasFactory;

    public function products() {
        return $this->hasMany(Product::class, 'car_model_id');
    }
}
