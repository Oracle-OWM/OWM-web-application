<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\admins\RegisterAdminRequest;
use App\Http\Requests\admins\UpdateAdminRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\Admin;
use Illuminate\Http\Request;
use JWTAuth;

class AdminsController extends Controller
{
    use APIsTrait;
    use GeneralTrait;

    public function getAllAdmins()
    {
        $admins = Admin::all()->map(function($admin){
//            $admin->department;
            return $admin;
        });
        if ($admins->count()>= 1) {
            return $this->returnData('admins', $admins, 'All admins has been returned successfully');
        } else {
            return $this->returnError('There is not any admin', 'S004');
        }
    }

    public function getAdmin(Request $request, $id)
    {
        $admin = Admin::find($request->id);
        if ($admin) {
//            $admin->department;
            return $this->returnData('admin', $admin, 'Admin has been returned successfully');
        } else {
            return $this->returnError('This Admin is not exist', "S004");
        }
    }

    public function login(LoginRequest $request) {
        try {
            $request->validated();

            // $admin = Auth::guard('admin-api')->admin();
            $admin = Admin::where('username', '=', $request->identifier)->orWhere('email', '=', $request->identifier)->first();

            if(!$admin) {
                return $this->returnError('Email/Username is incorrect', 'S001');

            } else if(password_verify($request->password, $admin->password)) { // check password
//            } else if(Hash::check($request->password, $admin->password)) { // check password
                // update admin firebase token
                if($request->firebase_token) {
                    $admin->update([
                        'firebase_token'=> $request->firebase_token,
                    ]);
                }

//                $credentials = ['email'=>$admin->email, 'password'=>$request->password];
//                $token = $this->guard('admin-api')->attempt($credentials);
                $token = JWTAuth::fromUser($admin);
                if (!$token) {
                    return $this->returnError('Unauthorized', 'E3001');
                }

                $data = [
                    'id'=> $admin->id,
                    'username'=> $admin->username,
                    'first_name'=> $admin->first_name,
                    'last_name'=> $admin->last_name,
                    'email'=> $admin->email,
                    'image'=> $admin->image,
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

    public function addAdmin(RegisterAdminRequest $request)
    {
        $request->validated();
        $password = password_hash($request->password, PASSWORD_DEFAULT);

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/admins');
            } else {
                $imgPath = null;
            }
            $admin = Admin::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => $password,
                'image' => $imgPath,
            ]);

            if($admin) {
                return $this-> returnSuccessMessage('Admin successfully registered');
            } else {
                return $this-> returnError('Registration Failed', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function updateAdmin(UpdateAdminRequest $request, $id)
    {
        $request->validated();

        //Get Admin
        $admin = Admin::find($id);
        if (!$admin)
            return $this->returnError('This admin is not exist anymore', 'S004');

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/admins');
            } else {
                $imgPath = null;
            }
            $updated = $admin->update([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'username' => $request->username,
                'email' => $request->email,
                'image' => $imgPath,
            ]);

            if($updated) {
                return $this-> returnSuccessMessage('Admin successfully registered');
            } else {
                return $this-> returnError('Registration Failed', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function deleteAdmin($id)
    {
        $admin = Admin::find($id);   // Admin::where('id','$request->id') -> first();
        if (!$admin)
            return $this->returnError('This admin is not exist anymore', 'S004');

        $deleted = $admin->delete();
        if ($deleted)
            return $this->returnSuccessMessage('Admin No. ' . "$id" . ' has been deleted successfully');
        else
            return $this->returnError('This admin can\'t be deleted', 'S003');
    }}
