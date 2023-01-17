<?php

    namespace App\Console;

    use App\Console\Commands\checkIoTStatus;
    use App\Models\IoTDevice;
    use Carbon\Carbon;
    use Illuminate\Console\Scheduling\Schedule;
    use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

    class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        checkIoTStatus::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
//        $schedule->command('IoT:checkStatus')->everyMinute();
        $schedule->call(function () {
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
        })->everyMinute();

    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
