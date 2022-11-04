<?php

namespace App\Console\Commands;

use App\Http\Traits\GeneralTrait;
use App\Models\Admin\Table;
use App\Models\User;
use Illuminate\Console\Command;

class sendTodayTableToUser extends Command
{
    use GeneralTrait;
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
        foreach (User::all() as $user) {
            $table = Table::where('section', '=', $user->section)
                ->where('academic_year', '=', $user->academic_year)
                ->where('department', '=', $user->department_id)
                ->select('start_time', 'end_time', 'subject', 'day', 'location')
                ->get();
            $this->sendNotificationToMobile([$user->firebase_token], 'notification', $table);
        }
    }
}
