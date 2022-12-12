<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\observers\RegisterObserverRequest;
use App\Http\Requests\observers\UpdateObserverRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\Observer;
use App\Models\User;
use Illuminate\Http\Request;

class ObserversController extends Controller
{
    use APIsTrait;
    use GeneralTrait;

    public function getAllObservers()
    {
        $observers = Observer::all()->map(function($observer){
            $observer->user;
            return $observer;
        });
        if ($observers->count()>= 1) {
            return $this->returnData('observers', $observers, 'All observers has been returned successfully');
        } else {
            return $this->returnError('There is not any observer', 'S004');
        }
    }

    public function getObserver(Request $request, $id)
    {
        $observer = Observer::find($request->id);
        if ($observer) {
            $observer->user;
            return $this->returnData('observer', $observer, 'Service provider has been returned successfully');
        } else {
            return $this->returnError('This observer is not exist', "S004");
        }
    }

    public function login(LoginRequest $request) {
        try {
            $request->validated();

            // $observer = Auth::guard('observer-api')->observer();
            $observer = Observer::where('username', '=', $request->identifier)->orWhere('email', '=', $request->identifier)->first();

            if(!$observer) {
                return $this->returnError('Email/username is incorrect', 'S001');

            } else if(password_verify($request->password, $observer->password)) { // check password
//            } else if(Hash::check($request->password, $observer->password)) { // check password
                // update observer firebase token
                if($request->firebase_token) {
                    $observer->update([
                        'firebase_token'=> $request->firebase_token,
                    ]);
                }

                $token = JWTAuth::fromUser($observer);
                if (!$token) {
                    return $this->returnError('Unauthorized', 'E3001');
                }

                $data = [
                    'id'=> $observer->id,
                    'username'=> $observer->username,
                    'first_name'=> $observer->first_name,
                    'last_name'=> $observer->last_name,
                    'email'=> $observer->email,
                    'phone'=> $observer->phone,
                    'country'=> $observer->country,
                    'city_area'=> $observer->city_area,
                    'street'=> $observer->street,
                    'image'=> $observer->image,
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

    public function register(RegisterObserverRequest $request)
    {
        $request->validated();
        $password = password_hash($request->password, PASSWORD_DEFAULT);

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/observers');
            } else {
                $imgPath = null;
            }
            $observer = Observer::create([
                'user_id' => User::where('username', '=', strtolower($request->user_username))->get()->first()->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'username' => strtolower($request->username),
                'email' => strtolower($request->email),
                'password' => $password,
                'country' => $request->country,
                'city_area' => $request->city_area,
                'street' => $request->street,
                'phone' => $request->phone,
                'image' => $imgPath,
            ]);

            if($observer) {
                return $this-> returnSuccessMessage('Observer successfully registered');
            } else {
                return $this-> returnError('Registration Failed', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function updateObserver(UpdateObserverRequest $request, $id)
    {
        $request->validated();

        //Get Observer
        $observer = Observer::find($id);
        if (!$observer)
            return $this->returnError('This observer is not exist anymore', 'S004');

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/observers');
            } else {
                $imgPath = null;
            }
            $updated = $observer->update([
                'user_id' => User::where('username', '=', strtolower($request->user_username))->get()->first()->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'username' => strtolower($request->username),
                'email' => strtolower($request->email),
                'country' => $request->country,
                'city_area' => $request->city_area,
                'street' => $request->street,
                'phone' => $request->phone,
                'image' => $imgPath,
            ]);

            if($updated) {
                return $this-> returnSuccessMessage('Observer successfully registered');
            } else {
                return $this-> returnError('Registration Failed', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function deleteObserver($id)
    {
        $observer = Observer::find($id);   // Observer::where('id','$request->id') -> first();
        if (!$observer)
            return $this->returnError('This observer is not exist anymore', 'S004');

        $deleted = $observer->delete();
        if ($deleted)
            return $this->returnSuccessMessage('Observer No. ' . "$id" . ' has been deleted successfully');
        else
            return $this->returnError('This observer can\'t be deleted', 'S003');
    }
}
