<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIoTDeviceReadingHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('io_t_device_reading_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('device_id')
                ->constrained('io_t_devices')
                ->cascadeOnDelete();
            $table->double('liters_consumed');
            $table->double('flow_rate');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('io_t_device_reading_histories');
    }
}
