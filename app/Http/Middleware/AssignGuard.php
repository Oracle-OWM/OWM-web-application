<?php

namespace App\Http\Middleware;

use App\Http\Traits\APIsTrait;
use App\Models\Admin;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AssignGuard extends BaseMiddleware
{
    use APIsTrait;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $guard = null)
    {
       if($guard != null) {

           $admin = null;
           try {
               //    auth()->shouldUse($guard); //shoud you admin guard / table
               $admin = JWTAuth::parseToken()->authenticate();
           } catch (\Exception $e) {
               if ($e instanceof TokenInvalidException) {
                   return $this->returnError('INVALID_TOKEN', 'E3001');
               } elseif ($e instanceof TokenExpiredException) {
                   return $this->returnError('EXPIRED_TOKEN', 'E3001');
               } else {
                   return $this->returnError('Unauthenticated', 'E3001');
               }
           } catch (\Throwable $e) {
               if ($e instanceof TokenInvalidException) {
                   return $this->returnError('INVALID_TOKEN', 'E3001');
               } elseif ($e instanceof TokenExpiredException) {
                   return $this->returnError('EXPIRED_TOKEN', 'E3001');
               } else {
                   return $this->returnError('Unauthenticated', 'E3001');
               }
           }
           if (!$admin) {
               return $this->returnError( 'Unauthenticated', '402');
           }
           return $next($request);
       }
    }
}
