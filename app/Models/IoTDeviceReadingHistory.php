<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IoTDeviceReadingHistory extends Model
{
    protected $fillable = [
        'device_id',
        'pressure', 'sugar', 'pulse_rate', 'oxygen',
        'created_at', 'updated_at'
    ];
    use HasFactory;
}
