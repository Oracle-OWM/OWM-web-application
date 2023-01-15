<?php

namespace App\Events;

use App\Models\IoTDevice;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DashboardIoTDeviceDetails implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $title;
    public $message;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($device_id)
    {
        $this->title = 'dashboard_ToTDevice_details';
        $IoTDevice = IoTDevice::find($device_id);

        $IoTDevice =  [
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
        $this->message = $IoTDevice;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('dashboard-IoTDevice-details-channel');
    }

    public function broadcastAs()
    {
        return 'DashboardIoTDeviceDetails';
    }
}
