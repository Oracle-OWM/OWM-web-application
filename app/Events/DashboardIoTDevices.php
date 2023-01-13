<?php

namespace App\Events;

use App\Models\IoTDevice;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DashboardIoTDevices implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $title;
    public $message;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->title = 'dashboard_ToTDevices';
        $this->message = IoTDevice::all()->map(function($IoTDevice) {
            $IoTDevice->users;
            $IoTDevice->readings;
        });
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('dashboard-IoTDevices-channel');
    }

    public function broadcastAs()
    {
        return 'DashboardIoTDevices';
    }
}
