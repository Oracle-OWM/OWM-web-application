<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\users\RegisterUserRequest;
use App\Http\Requests\users\UpdateUserRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use JWTAuth;

class UsersController extends Controller
{
    use APIsTrait;
    use GeneralTrait;

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


            if($user != null && password_verify($request->password, $user->password)) { // check password

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
                    'image'=> $user->image,
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
                'phone' => $request->phone,
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
}
