<?php

namespace App\Http\Controllers\APIs\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\IoT_devices\AddIoTDeviceRequest;
use App\Http\Requests\IoT_devices\AssociateDeviceToUserRequest;
use App\Http\Requests\IoT_devices\ChangeFlowStatusRequest;
use App\Http\Requests\IoT_devices\ChangePowerStatusRequest;
use App\Http\Requests\IoT_devices\SendNewReadRequest;
use App\Http\Requests\IoT_devices\UpdateIoTDeviceRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\IoTDevice;
use App\Models\IoTDeviceReadingHistory;
use App\Models\UsersDevice;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class IoTDevicesController extends Controller
{
    use APIsTrait;
    use GeneralTrait;

    public function getAllUserIoTDevices()
    {
        $IoTDevices = IoTDevice::all()->map(function($IoTDevice){
            $IoTDevice->readings;
            return $IoTDevice;
        });
        if ($IoTDevices->count()>= 1) {
            return $this->returnData('IoTDevices', $IoTDevices, 'All devices has been returned successfully');
        } else {
            return $this->returnError('There is not any device', 'S004');
        }
    }

    public function getIoTDevice($token)
    {
        $IoTDevice = IoTDevice::where('token', '=', $token)->get()->first();
        if ($IoTDevice) {
            $IoTDevice->readings;
            return $this->returnData('IoTDevice', $IoTDevice, 'Device has been returned successfully');
        } else {
            return $this->returnError('This device is not exist', "S004");
        }
    }

    public function associateDeviceToUser(AssociateDeviceToUserRequest $request) {
        $request->validated();

        try {
            $IoTDevice = IoTDevice::where('token', '=', $request->token)->get()->first();
            $IoTDevice->readings;

            $user_id = Auth::user()->id;
            if($user_id) {
                foreach (UsersDevice::all() as $user_device) {
                    if($user_device->user_id==$user_id && $user_device->device_id==$IoTDevice->id) {
                        return $this-> returnError('This device is already associate', 'S003');
                    }
                }
                $users_device = UsersDevice::create([
                    'user_id' => $user_id,
                    'device_id' => $IoTDevice->id
                ]);

                if($users_device) {
                    return $this-> returnData('IoTDevice', $IoTDevice, 'Device has been associated to user successfully');
                } else {
                    return $this-> returnError('Failed to associate device', 'S003');
                }
            } else {
                return $this->returnError('Something went wrong', "S002");
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function changePowerStatus(ChangePowerStatusRequest $request)
    {
        $IoTDevice = IoTDevice::where('token', '=', $request->token)->get()->first();
        if ($IoTDevice) {
            // update power status in the WS channel
            broadcast(new \App\Events\DevicePowerStatus($request->start_read));

            // update power status in database
            $IoTDevice->update([
                'start_read'=> $request->start_read,
            ]);
            return $this->returnSuccessMessage('Status has been changed successfully');
        } else {
            return $this->returnError('This device is not exist', "S004");
        }
    }

    public function changeFlowStatus(ChangeFlowStatusRequest $request)
    {

        $IoTDevice = IoTDevice::where('token', '=', $request->token)->get()->first();
        if ($IoTDevice) {
            // update power status in the WS channel
            broadcast(new \App\Events\DeviceFlowStatus($request->flow_status));

            // update power status in database
            $IoTDevice->update([
                'flow_status'=> $request->flow_status,
            ]);
            return $this->returnSuccessMessage('Status has been changed successfully');
        } else {
            return $this->returnError('This device is not exist', "S004");
        }
    }

    public function addReading(SendNewReadRequest $request)
    {
        $request->validated();

        try {
            $IoTDevice = IoTDevice::where('token', '=', $request->token)->get()->first();
            if ($IoTDevice) {

                // Store read in database
                $IoTDeviceReadingHistory = IoTDeviceReadingHistory::create([
                    'device_id'=>$IoTDevice->id,
                    'liters_consumed'=>$request->liters_consumed,
                    'flow_rate'=>$request->flow_rate,
                ]);

                if($IoTDeviceReadingHistory) {
                    // push data in WS readings channel
                    broadcast(new \App\Events\DeviceReadings($IoTDevice->id));
                    return $this->returnSuccessMessage('Read has been stored returned successfully');
                } else {
                    return $this->returnError('Something went wrong', "S002");
                }
            } else {
                return $this->returnError('This device is not exist', "S004");
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }
}


