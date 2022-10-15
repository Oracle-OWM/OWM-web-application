<?php

namespace App\Http\Controllers\APIs\Admin;

use App\Http\Controllers\Controller;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\Admin\Notification;
use Illuminate\Http\Request;
use Mockery\Matcher\Not;

class NotificationsController extends Controller
{
    use GeneralTrait;
    use APIsTrait;

    public function getAllNotifications() {
        $notifications = Notification::all();
        if (count($notifications) !=0) {
            return $this-> returnData('notifications_data', $notifications, 'All notifications has been returned successfully');
        } else {
            return $this-> returnError('There is not any notification', "SS1");
        }
    }

    public function storeNotification(Request $request)
    {
        //create notification
        $notification = Notification::create([
            'title' => $request->title,
            'description' => $request->description,
            'type' => $request->type,
            'image' => $request->image,
        ]);
        if ($notification)
            return $this-> returnSuccessMessage('Notification has been added successfully');
        else
            return $this-> returnError('This Notification can\'t be added', 'error1');
    }

    public function deleteNotification($id) {
        $notification = Notification::find($id);   // Admin::where('id','$request->id') -> first();
        if (!$notification)
            return $this-> returnError('This Notification is not exist anymore', 'error1');

        $deleted = $notification->delete();
        if($deleted)
            return $this-> returnSuccessMessage('Notification No. '."$id".' has been deleted successfully');
        else
            return $this-> returnError('This Notification can\'t be deleted', 'error1');
    }


    public function sendNotificationToMobile (Request $request) {
        $SERVER_API_KEY = 'AAAA_nMvO8o:APA91bFenOCMhQHZ-VG8RPDnfMx9LjhLXXgl0uUZ2xwneXLNd02dRb_J4-tau31TqkhmP3BSGy1yS_0mxWcRqAp5SyR75DCZAl63D4ciFX7Hxt_HBNXbsIRHda_wKw2Y3l8XHSrIGra9';
        // $token_1 = 'fHPdpxEYR0-WH9D2yTtwYd:APA91bF4N34jc7BOUMxH-WGZX08pn8Fi4jZWuuAI7kInPsKUAs4JIF73jeKgh9VY6909yhjsiQketug1GDoVRRCaK0ulj9at-4hwbASc5NYWnsNYtNvQKWuC-vx_wbqE8spJj0rIuwGH';
        $data = [
            "registration_ids" => $request->tokens,
            // "registration_ids" => [
                // $token_1
            // ],

            "data" => [
                "type" => 'notification', // notification OR request
                'title' => $request->title, // notification OR request
                'message' => $request->message, // message OR url to be requested
                "sound"=> "default" // required for sound on ios
            ],
        ];
        $dataString = json_encode($data);
        $headers = [
            'Authorization: key=' . $SERVER_API_KEY,
            'Content-Type: application/json',
        ];

        // send request to FCM
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);
        $response = curl_exec($ch);

        return $this->returnSuccessMessage('message has sent successfully');
//        dd($response);

    }
}
