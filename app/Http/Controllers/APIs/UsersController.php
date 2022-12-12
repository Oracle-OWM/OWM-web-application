<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\users\RegisterUserRequest;
use App\Http\Requests\users\UpdateUserRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\Observer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use JWTAuth;

class UsersController extends Controller
{
    use APIsTrait;
    use GeneralTrait;

    public function getAllUsers()
    {
        $users = User::all()->map(function($user){
            $user->diseases = json_decode($user->diseases);
            $user->IoTDevice;
            return $user;
        });
        if ($users->count()>= 1) {
            return $this->returnData('users', $users, 'All users has been returned successfully');
        } else {
            return $this->returnError('There is not any user', 'S004');
        }
    }

    public function getUser($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->IoTDevice;
            return $this->returnData('user', $user, 'User has been returned successfully');
        } else {
            return $this->returnError('This User is not exist', "S004");
        }
    }

    public function getProfile()
    {
        $user = User::find(Auth::id());
        if ($user) {
            $user->IoTDevice;
            return $this->returnData('user', $user, 'User has been returned successfully');
        } else {
            return $this->returnError('This User is not exist', "S004");
        }
    }

    public function login(LoginRequest $request) {
        try {
            $request->validated();

            // $user = Auth::guard('user-api')->user();
            $user = User::where('username', '=', $request->identifier)->orWhere('email', '=', $request->identifier)->first();
            $observer = Observer::where('username', '=', $request->identifier)->orWhere('email', '=', $request->identifier)->first();


            if(!$user && !$observer) {
                return $this->returnError('Email/Username is incorrect', 'S001');
            } else if($user != null && password_verify($request->password, $user->password)) { // check password

                $credentials = ['email'=>$user->email, 'password'=>$request->password];
                $token = auth()->guard('user-api')->attempt($credentials);
                if (!$token) {
                    return $this->returnError('Unauthorized', 'E3001');
                }

                $data = [
                    'id'=> $user->id,
                    'username'=> $user->username,
                    'first_name'=> $user->first_name,
                    'last_name'=> $user->last_name,
                    'email'=> $user->email,
                    'phone'=> $user->phone,
                    'country'=> $user->country,
                    'city_area'=> $user->city_area,
                    'street'=> $user->street,
                    'image'=> $user->image,
                    'age'=> $user->age,
                    'diseases'=> json_decode($user->diseases),
                    'token_data'=> $this->createNewToken($token),
                ];
                return $this->returnData('data', $data, 'returned token');
            } else if($observer != null && password_verify($request->password, $observer->password)) { // check password
//            } else if(Hash::check($request->password, $user->password)) { // check password
                // update observer firebase token

                $credentials = ['email'=>$observer->email, 'password'=>$request->password];
                $token = auth()->guard('observer-api')->attempt($credentials);
//                $token = JWTAuth::fromUser($observer);
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

    public function register(RegisterUserRequest $request)
    {
        $request->validated();
        $password = password_hash($request->password, PASSWORD_DEFAULT);

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/users');
            } else {
                $imgPath = null;
            }
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'username' => strtolower($request->username),
                'email' => strtolower($request->email),
                'password' => $password,
                'country' => $request->country,
                'city_area' => $request->city_area,
                'street' => $request->street,
                'phone' => $request->phone,
                'age'=> $request->age,
                'diseases'=> json_encode($request->diseases),
                'image' => $imgPath,
            ]);

            if($user) {
                return $this-> returnSuccessMessage('User successfully registered');
            } else {
                return $this-> returnError('Registration Failed', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function updateUser(UpdateUserRequest $request, $id)
    {
        $request->validated();

        //Get User
        $user = User::find($id);
        if (!$user)
            return $this->returnError('This user is not exist anymore', 'S004');

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/users');
            } else {
                $imgPath = null;
            }
            $updated = $user->update([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'username' => strtolower($request->username),
                'email' => strtolower($request->email),
                'country' => $request->country,
                'city_area' => $request->city_area,
                'street' => $request->street,
                'phone' => $request->phone,
                'age'=> $request->age,
                'diseases'=> json_encode($request->diseases),
                'image' => $imgPath,
            ]);

            if($updated) {
                return $this-> returnSuccessMessage('User successfully registered');
            } else {
                return $this-> returnError('Registration Failed', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function deleteUser($id)
    {
        $user = User::find($id);   // User::where('id','$request->id') -> first();
        if (!$user)
            return $this->returnError('This user is not exist anymore', 'S004');

        $deleted = $user->delete();
        if ($deleted)
            return $this->returnSuccessMessage('User No. ' . "$id" . ' has been deleted successfully');
        else
            return $this->returnError('This user can\'t be deleted', 'S003');
    }
}
