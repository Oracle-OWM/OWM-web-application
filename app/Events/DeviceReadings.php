<?php

namespace App\Events;

use App\Models\IoTDeviceReadingHistory;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DeviceReadings implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $title;
    public $message;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($token)
    {
        $this->title = 'readings';
        $this->message = IoTDeviceReadingHistory::where('device_token', '=', $token)->get();
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('device-readings-channel');
    }

    public function broadcastAs()
    {
        return 'DeviceReadings';
    }
}
