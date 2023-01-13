<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IoTDeviceReadingHistory extends Model
{
    protected $fillable = [
        'device_id',
        'liters_consumed', 'flow_rate',
        'created_at', 'updated_at'
    ];
    use HasFactory;

    public function readings() {
        return $this->belongsTo(IoTDevice::class, 'device_id');
    }
}
