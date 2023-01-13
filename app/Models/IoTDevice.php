<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IoTDevice extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'token',
        'start_read', 'connection_status', 'flow_status',
        'created_at', 'updated_at',
    ];

    protected $hidden = [
        'created_at', 'updated_at',
    ];

    public function users() {
        return $this->belongsToMany(User::class, 'users_devices', 'device_id', 'user_id');
    }

    public function readings() {
        return $this->hasMany(IoTDeviceReadingHistory::class, 'device_id');
    }
}
