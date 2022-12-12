<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIs\NewPasswordController;
use App\Http\Controllers\APIs\Admin\NotificationsController;
use App\Http\Controllers\APIs\AdminsController;
use App\Http\Controllers\APIs\UsersController;
use App\Http\Controllers\APIs\AuthController;
use App\Http\Controllers\APIs\IoTDevicesController;
use App\Http\Controllers\APIs\ObserversController;
use App\Http\Controllers\CMSController;
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
    Route::get('/send-new-reading', [IoTDevicesController::class, 'sendNewReading']);
    Route::get('/start-read/{token}', [IoTDevicesController::class, 'confirmStartReading']);


    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/me', [AuthController::class, 'me']);
    Route::post('/forgot-password', [NewPasswordController::class, 'forgotPassword']);
    Route::post('/reset-password', [NewPasswordController::class, 'reset']);
    Route::post('/send-notification', [NotificationsController::class, 'sendNotificationToMobile']);

    Route::group(['prefix'=>'cms', ], function() {
        Route::get('/get-content', [CMSController::class, 'getContent']);
    });

    Route::group(['prefix'=>'admin', ], function() {
        Route::post('/login', [AdminsController::class, 'login']);

        Route::group(['middleware'=>'auth.guard:admin-api'], function () {
            Route::group(['prefix'=>'IoT-devices'], function() {
                Route::get('/', [IoTDevicesController::class, 'getAllIoTDevices']);
                Route::get('/{id}', [IoTDevicesController::class, 'getIoTDevice']);
                Route::post('/', [IoTDevicesController::class, 'addIoTDevice']);
                Route::put('/{id}', [IoTDevicesController::class, 'updateIoTDevice']);
                Route::delete('/{id}', [IoTDevicesController::class, 'deleteIoTDevice']);
            });

            Route::group(['prefix'=>'user'], function() {
                Route::get('/', [UsersController::class, 'getAllUsers']);
                Route::get('/{id}', [UsersController::class, 'getUser']);
                Route::post('/', [UsersController::class, 'register']);
                Route::put('/{id}', [UsersController::class, 'updateUser']);
                Route::delete('/{id}', [UsersController::class, 'deleteUser']);
            });

            Route::group(['prefix'=>'observer'], function() {
//                Route::group(['prefix'=>'observer'], function() {
                Route::get('/', [ObserversController::class, 'getAllObservers']);
                Route::get('/{id}', [ObserversController::class, 'getObserver']);
                Route::post('/', [ObserversController::class, 'register']);
                Route::put('/{id}', [ObserversController::class, 'updateObserver']);
                Route::delete('/{id}', [ObserversController::class, 'deleteObserver']);
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
                Route::get('/{token}', [IoTDevicesController::class, 'getIoTDeviceHistory']);
                Route::post('/', [IoTDevicesController::class, 'IoTDeviceStartRead']);
            });

            Route::get('/show-profile', [UsersController::class, 'getProfile']);

        });
    });
});

//if (Auth::guard('doctor')->check()){
//    $comment->doctor_id = Auth::id(); // Auth::guard('doctor')->id;
//}
