<?php

namespace App\Http\Controllers\APIs\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\IoT_devices\AddIoTDeviceRequest;
use App\Http\Requests\IoT_devices\UpdateIoTDeviceRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\IoTDevice;
use App\Models\IoTDeviceReadingHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminIoTDevicesController extends Controller
{
    use APIsTrait;
    use GeneralTrait;

    public function getAllIoTDevices()
    {
        $IoTDevices = IoTDevice::all()->map(function($IoTDevice){
            $IoTDevice->readings;
            return $IoTDevice;
        });
        if ($IoTDevices->count()>= 1) {
            return $this->returnData('IoTDevices', $IoTDevices, 'All Devices has been returned successfully');
        } else {
            return $this->returnError('There is not any device', 'S004');
        }
    }

    public function getIoTDevice($id)
    {
        $IoTDevice = IoTDevice::find($id);
        if ($IoTDevice) {
            $IoTDevice->readings;
            return $this->returnData('IoTDevice', $IoTDevice, 'Device has been returned successfully');
        } else {
            return $this->returnError('This device is not exist', "S004");
        }
    }

    public function addIoTDevice(AddIoTDeviceRequest $request)
    {
        $request->validated();

        try {
            $token = Str::random(7);
            $IoTDevice = IoTDevice::create([
                'name' => $request->name,
                'token' => $token,
            ]);

            if($IoTDevice) {
                return $this-> returnSuccessMessage('Device successfully added');
            } else {
                return $this-> returnError('Failed to add Device', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function updateIoTDevice(UpdateIoTDeviceRequest $request, $id)
    {
        $request->validated();

        try {
            $IoTDevice = IoTDevice::find($id);
            $done = $IoTDevice->update([
                'name' => $request->name,
                'start_read' => $request->start_read,
            ]);

            if($done) {
                return $this-> returnSuccessMessage('Device successfully updated');
            } else {
                return $this-> returnError('Failed to add Device', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function deleteIoTDevice($id)
    {
        $banner = IoTDevice::find($id);   // Banner::where('id','$request->id') -> first();
        if (!$banner)
            return $this->returnError('This device is not exist anymore', 'S004');

        $deleted = $banner->delete();
        if ($deleted)
            return $this->returnSuccessMessage('Device No. ' . "$id" . ' has been deleted successfully');
        else
            return $this->returnError('This device can\'t be deleted', 'S003');
    }

}
