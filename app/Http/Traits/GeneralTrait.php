<?php

namespace App\Http\Traits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Psy\Util\Str;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;


trait GeneralTrait {
    use APIsTrait;


    public function saveFile($file,$path){
        $fileNameWithExt = $file->getClientOriginalName();

        // Delete old file
        $exists = Storage::disk('local')->exists($path.$fileNameWithExt);

        if ($exists) {
            Storage::delete( $path . $fileNameWithExt);
        }

        // Upload new file

        $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
        $extension = $file->getClientOriginalExtension();
        $fileNameToStore = $fileName.time().'.'.$extension;
        $path = $file->move($path , $fileNameToStore);

        return $path ;
    }

    public function logout(Request $request) {
//        auth()->logout();
//        return $this->returnSuccessMessage('Successfully logged out');
        $token = $request->header('auth_token');
        if ($token) {
            try {
                JWTAuth::setToken($token)->invalidate();
            } catch (TokenInvalidException $e) {
                return $this->returnError('', 'Invalid Token');
            }
            return $this->returnSuccessMessage('Logged out');
        } else {
            $this->returnError('', 'There is no token sent');
        }
    }

    public function passwordGenerator($model, $trow,  $prefix, $lenght=4) {
        $kh_data = $model::orderBy('id', 'desc')->first();
        if(!$kh_data) {
            $kh_length = $lenght;
            $last_number = '';
        } else {
            $code_kh = substr($kh_data->$trow, strlen($prefix)+1);
            $kh_last_number = (integer)$code_kh;
            $increment_last_number = $kh_last_number+1;
            $last_number_length = strlen($increment_last_number);
            $kh_length = $lenght - $last_number_length;
            $last_number = $increment_last_number;
        }
        $khmer = "";
        for($i=0; $i<$kh_length;$i++) {
            $khmer.='0';
        }
        return $prefix.'-'.\Illuminate\Support\Str::uuid();
    }

    public function search($model, $cols, $keyword) {
        foreach ($cols as $col) {
            $data = $model::where($col, 'like', '%'.$keyword.'%')->get();
            if(is_array($data))
                return $data;
        }
    }

    public function getCurrentLang() {

        return app()->getLocale();
    }

    public function sendNotificationToMobile ($tokens, $title, $message) {
        $SERVER_API_KEY = env(FIREBASE_SERVER_API_KEY, 'AAAA_nMvO8o:APA91bFenOCMhQHZ-VG8RPDnfMx9LjhLXXgl0uUZ2xwneXLNd02dRb_J4-tau31TqkhmP3BSGy1yS_0mxWcRqAp5SyR75DCZAl63D4ciFX7Hxt_HBNXbsIRHda_wKw2Y3l8XHSrIGra9');
//        $token_1 = 'Test Token';
        $data = [
            "registration_ids" => $tokens,
            "data" => [
                "type" => 'notification', // notification OR request
                'title' => $title, // notification OR request
                'message' => $message, // message OR url to be requested
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

//        dd($response);

    }

    public function createNewToken($token){
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => env('TTL') * 60,
        ];
    }
}
