<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\service_providers\RegisterServiceProviderRequest;
use App\Http\Requests\service_providers\UpdateServiceProviderRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\ServiceProvider;
use Illuminate\Http\Request;

class ServiceProvidersController extends Controller
{
    use APIsTrait;
    use GeneralTrait;

    public function getAllServiceProviders()
    {
        $serviceProviders = ServiceProvider::all()->map(function($serviceProvider){
//            $serviceProvider->department;
            return $serviceProvider;
        });
        if ($serviceProviders->count()>= 1) {
            return $this->returnData('service_providers', $serviceProviders, 'All service providers has been returned successfully');
        } else {
            return $this->returnError('There is not any service provider', 'S004');
        }
    }

    public function getServiceProvider(Request $request, $id)
    {
        $service_provider = ServiceProvider::find($request->id);
        if ($service_provider) {
//            $service_provider->department;
            return $this->returnData('service_provider', $service_provider, 'Service provider has been returned successfully');
        } else {
            return $this->returnError('This service provider is not exist', "S004");
        }
    }

    public function login(LoginRequest $request) {
        try {
            $request->validated();

            // $service_provider = Auth::guard('service_provider-api')->service_provider();
            $service_provider = ServiceProvider::where('username', '=', $request->identifier)->orWhere('email', '=', $request->identifier)->first();

            if(!$service_provider) {
                return $this->returnError('Email/username is incorrect', 'S001');

            } else if(password_verify($request->password, $service_provider->password)) { // check password
//            } else if(Hash::check($request->password, $service_provider->password)) { // check password
                // update service_provider firebase token
                if($request->firebase_token) {
                    $service_provider->update([
                        'firebase_token'=> $request->firebase_token,
                    ]);
                }

                $token = JWTAuth::fromUser($service_provider);
                if (!$token) {
                    return $this->returnError('Unauthorized', 'E3001');
                }

                $data = [
                    'id'=> $service_provider->id,
                    'username'=> $service_provider->username,
                    'first_name'=> $service_provider->first_name,
                    'last_name'=> $service_provider->last_name,
                    'email'=> $service_provider->email,
                    'phone'=> $service_provider->phone,
                    'country'=> $service_provider->country,
                    'city_area'=> $service_provider->city_area,
                    'street'=> $service_provider->street,
                    'image'=> $service_provider->image,
                    'store_location'=> $service_provider->store_location,
                    'store_phone_number'=> $service_provider->store_phone_number,
                    'store_address'=> $service_provider->store_address,
                    'store_image'=> $service_provider->store_image,
                    'token_data'=> $this->createNewToken($token),
                ];

                return $this->returnData('data', $data, 'returned token');
            } else {
                return $this->returnError('password doesn\'t match', 'S002');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getMessage(), $e->getCode() );
        }
    }

    public function register(RegisterServiceProviderRequest $request)
    {
        $request->validated();
        $password = password_hash($request->password, PASSWORD_DEFAULT);

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/service_providers');
            } else {
                $imgPath = null;
            }
            $service_provider = ServiceProvider::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => $password,
                'country' => $request->country,
                'city_area' => $request->city_area,
                'street' => $request->street,
                'phone' => $request->phone,
                'image' => $imgPath,
                'store_name' => $request->store_name,
                'store_location' => $request->store_location,
                'store_phone_number' => $request->store_phone_number,
                'store_address' => $request->store_address,
                'store_image' => $request->store_image,
            ]);

            if($service_provider) {
                return $this-> returnSuccessMessage('ServiceProvider successfully registered');
            } else {
                return $this-> returnError('Registration Failed', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function updateServiceProvider(UpdateServiceProviderRequest $request, $id)
    {
        $request->validated();

        //Get ServiceProvider
        $service_provider = ServiceProvider::find($id);
        if (!$service_provider)
            return $this->returnError('This service provider is not exist anymore', 'S004');

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/service_providers');
            } else {
                $imgPath = null;
            }
            $updated = $service_provider->update([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'username' => $request->username,
                'email' => $request->email,
                'country' => $request->country,
                'city_area' => $request->city_area,
                'street' => $request->street,
                'phone' => $request->phone,
                'image' => $imgPath,
                'store_name' => $request->store_name,
                'store_location' => $request->store_location,
                'store_phone_number' => $request->store_phone_number,
                'store_address' => $request->store_address,
                'store_image' => $request->store_image,
            ]);

            if($updated) {
                return $this-> returnSuccessMessage('ServiceProvider successfully registered');
            } else {
                return $this-> returnError('Registration Failed', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function deleteServiceProvider($id)
    {
        $service_provider = ServiceProvider::find($id);   // ServiceProvider::where('id','$request->id') -> first();
        if (!$service_provider)
            return $this->returnError('This service provider is not exist anymore', 'S004');

        $deleted = $service_provider->delete();
        if ($deleted)
            return $this->returnSuccessMessage('ServiceProvider No. ' . "$id" . ' has been deleted successfully');
        else
            return $this->returnError('This service provider can\'t be deleted', 'S003');
    }
}
