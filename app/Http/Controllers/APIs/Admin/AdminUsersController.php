<?php

namespace App\Http\Controllers\APIs\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\users\AddUserRequest;
use App\Http\Requests\users\UpdateUserRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use JWTAuth;

class AdminUsersController extends Controller
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

    public function addUser(AddUserRequest $request)
    {
        $request->validated();
        $password = password_hash('User-'.Str::random(6), PASSWORD_DEFAULT);

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
                return $this-> returnSuccessMessage("User successfully registered, username: $user->username, password: $password");
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
