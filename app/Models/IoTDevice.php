<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IoTDevice extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'token',
        'start_read',
        'created_at', 'updated_at',
    ];

    public function user() {
        return $this->hasOne(User::class, 'device_id');
    }

    public function readings() {
        return $this->hasMany(IoTDeviceReadingHistory::class, 'device_id');
    }
}
