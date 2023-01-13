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
        $IoTDevices = IoTDevice::all()->map(function($IoTDevice) {
            return [
                'id'=> $IoTDevice->id,
                'name'=> $IoTDevice->name,
                'connection_status'=> $IoTDevice->connection_status,
                'flow_status'=> $IoTDevice->flow_status,
                'start_read'=> $IoTDevice->start_read,
                'token'=> $IoTDevice->token,
                'users'=> $IoTDevice->users,
                'readings'=> $IoTDevice->readings,
                'created_at'=> $IoTDevice->created_at,
                'updated_at'=> $IoTDevice->updated_at,
            ];
        });
        $this->message = $IoTDevices;
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
//event(new \App\Events\DashboardIoTDevices())
