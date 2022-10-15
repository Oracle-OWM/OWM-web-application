<?php

namespace App\Http\Controllers\APIs;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Mail\ResetPasswordLink;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Validation\Rules\Password as RulesPassword;
use Illuminate\Validation\ValidationException;
use JWTAuth;

class NewPasswordController extends Controller
{
    use APIsTrait;
    use GeneralTrait;

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

//        $status = Password::sendResetLink(['email'=>$request->email]);
        $token = Str::random(64);

        DB::table('password_resets')->insert([
           'email'=>$request->email,
           'token'=>$token,
           'created_at'=>Carbon::now(),
        ]);

        Mail::To($request->email)-> send(new ResetPasswordLink($token));

//        Mail::send('email.forgetPassword', ['token'=>$token], function ($message) use ($request) {
//            $message->from("fehuhelwan@gmail.com", 'FEHU');
//            $message->to($request->email);
//            $message->subject('Reset Password');
//        });

//        if ($status == Password::RESET_LINK_SENT) {
        return $this->returnSuccessMessage('Reset link has been sent successfully');
//        }
//        return $this->returnError("Something went wrong, $status", "S004");
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function showResetPasswordForm($token) {
        return view('auth.forgetPasswordLink', ['token' => $token]);
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function submitResetPasswordForm(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:8|confirmed',
            'password_confirmation' => 'required'
        ]);

        $updatePassword = DB::table('password_resets')->where([
            'email' => $request->email,
            'token' => $request->token
        ])->first();

        if(!$updatePassword){
            return back()->withInput()->with('error', 'Invalid token!');
        }

        $user = User::where('email', $request->email)
            ->update(['password' => password_hash($request->password, PASSWORD_DEFAULT)]);

        DB::table('password_resets')->where(['email'=> $request->email])->delete();

        return back()->with('message', 'Your password has been changed!');
    }

    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => ['required', 'min:8', 'confirmed'],
        ]);

        $check = DB::table('password_resets')->where([
            ['email', $request->email],
        ]);

        if ($check->exists()) {
            $difference = Carbon::now()->diffInSeconds($check->first()->created_at);
            if ($difference > 3600) {
                return $this->returnError("Token Expired", "S005");
            } else if(password_verify($request->token, $check->first()->token)) { // check password
                $delete = DB::table('password_resets')->where([
                    ['email', $request->all()['email']],
                ])->delete();

                return $this->returnSuccessMessage('Password reset successfully');
            }
            return $this->returnError("Invalid token", "S004");
        } else {
            return $this->returnError("Something went wrong, check the entered email or try resend link again", "S006");

        }

//        $status = Password::reset(
//            $request->only('email', 'password', 'password_confirmation', 'token'),
//            function ($user, $password) {
//                $user->forceFill([
//                    'password' => Hash::make($password)
//                ])->setRememberToken(Str::random(60));
//
//                $user->save();
//
//                event(new PasswordReset($user));
//            }
//        );

//        if ($status === Password::PASSWORD_RESET) {
//        return $this->returnSuccessMessage('Password reset successfully');




    }


}
