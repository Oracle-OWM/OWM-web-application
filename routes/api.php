<?php

use App\Http\Controllers\APIs\Admin\NotificationsController;
use App\Http\Controllers\APIs\AdminsController;
use App\Http\Controllers\APIs\AuthController;
use App\Http\Controllers\APIs\NewPasswordController;
use App\Http\Controllers\APIs\User\IoTDevicesController;
use App\Http\Controllers\APIs\Admin\AdminIoTDevicesController;
use App\Http\Controllers\APIs\UsersController;
use App\Http\Controllers\APIs\Admin\AdminUsersController;
use App\Http\Controllers\CMSController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group( ['prefix'=>'auth'] , function ($router) {
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/me', [AuthController::class, 'me']);
    Route::post('/forgot-password', [NewPasswordController::class, 'forgotPassword']);
    Route::post('/reset-password', [NewPasswordController::class, 'reset']);
    Route::post('/send-notification', [NotificationsController::class, 'sendNotificationToMobile']);

    Route::group(['prefix'=>'IoT-devices'], function () {
        Route::post('/add-reading', [IoTDevicesController::class, 'addReading']);
        Route::put('/change-power-status', [IoTDevicesController::class, 'changePowerStatus']);
        Route::put('/change-flow-status', [IoTDevicesController::class, 'changeFlowStatus']);
    });

    Route::group(['prefix'=>'cms', ], function() {
        Route::get('/get-content', [CMSController::class, 'getContent']);
    });

    Route::group(['prefix'=>'admin', ], function() {
        Route::post('/login', [AdminsController::class, 'login']);

        Route::group(['middleware'=>'auth.guard:admin-api'], function () {
            Route::group(['prefix'=>'IoT-devices'], function() {
                Route::get('/', [AdminIoTDevicesController::class, 'getAllIoTDevices']);
                Route::get('/{id}', [AdminIoTDevicesController::class, 'getIoTDevice']);
                Route::post('/', [AdminIoTDevicesController::class, 'addIoTDevice']);
                Route::put('/{id}', [AdminIoTDevicesController::class, 'updateIoTDevice']);
                Route::delete('/{id}', [AdminIoTDevicesController::class, 'deleteIoTDevice']);
            });

            Route::group(['prefix'=>'user'], function() {
                Route::get('/', [AdminUsersController::class, 'getAllUsers']);
                Route::get('/{id}', [AdminUsersController::class, 'getUser']);
                Route::post('/', [AdminUsersController::class, 'addUser']);
                Route::put('/{id}', [AdminUsersController::class, 'updateUser']);
                Route::delete('/{id}', [AdminUsersController::class, 'deleteUser']);
            });

            Route::get('/', [AdminsController::class, 'getAllAdmins']);
            Route::get('/{id}', [AdminsController::class, 'getAdmin']);
            Route::post('/', [AdminsController::class, 'addAdmin']);
            Route::put('/{id}', [AdminsController::class, 'updateAdmin']);
            Route::delete('/{id}', [AdminsController::class, 'deleteAdmin']);
        });
    });

    Route::group(['prefix'=>'user', ], function() {
        Route::post('/login', [UsersController::class, 'login']);
        Route::post('/register', [UsersController::class, 'register']);

        Route::group(['middleware'=>'auth.guard:user-api'], function () {
            Route::group(['prefix'=>'IoT-devices'], function() {
                Route::get('/associated-devices', [IoTDevicesController::class, 'associatedDevices']);
                Route::get('/{token}', [IoTDevicesController::class, 'getIoTDevice']);
                Route::post('/associate-user', [IoTDevicesController::class, 'associateDeviceToUser']);
                Route::post('/get-device-details', [IoTDevicesController::class, 'getIoTDeviceDetails']);
            });

            Route::get('/show-profile', [UsersController::class, 'getProfile']);
        });
    });
});

//if (Auth::guard('doctor')->check()){
//    $comment->doctor_id = Auth::id(); // Auth::guard('doctor')->id;
//}
