<?php

namespace App\Console\Commands;

use App\Models\IOTDevice;
use Carbon\Carbon;
use Faker\Provider\DateTime;
use Illuminate\Console\Command;

class checkIoTStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'IoT:checkStatus';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Change IoT Device status into offline if the last message sent was from 5 minutes or more';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $IoTDevices = IoTDevice::all();
        foreach ($IoTDevices as $IoTDevice) {
            $lastRead = $IoTDevice->readings->last();
            $max_allowed_time_for_IoT_reading = config('settings.max_allowed_time_for_IoT_reading', 2);
            $now = new Carbon();
            $then = new Carbon($lastRead->created_at); // "2012-07-18 21:11:12" for example
            $diff = $now->diffInMinutes($then);
            if ($diff >= $max_allowed_time_for_IoT_reading) {
                $IoTDevice->update([
                    'connection_status'=>'offline',
                ]);
            }
        }
    }
}
