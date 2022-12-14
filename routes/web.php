<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CMSController;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Symfony\Component\Console\Output\NullOutput;
use BeyondCode\LaravelWebSockets\Server\Logger\WebsocketsLogger;

app()->singleton(WebsocketsLogger::class, function () {
    return (new WebsocketsLogger(new NullOutput()))->enable(false);
});


use BeyondCode\LaravelWebSockets\Facades\WebSocketsRouter;
use App\Websockets\SocketHandler\CheckupsHandler;

Route::get('/send-message', function () {
//    event(new \App\Events\NewMessage($request->message));
    broadcast(new \App\Events\NewMessage('Hello Websockets'));
    return 'done';
});


//WebSocketsRouter::webSocket('/laravel-websockets/websocket-channel', CheckupsHandler::class);
//WebSocketsRouter::webSocket('/laravel-websockets', CheckupsHandler::class);
//WebSocketsRouter::webSocket('/', CheckupsHandler::class);
//WebSocketsRouter::get('/laravel-websockets', CheckupsHandler::class);
//WebSocketsRouter::get('/', CheckupsHandler::class);


// CMS
Route::group(['prefix'=>'/cms'], function (){
    Route::get('/',[CMSController::class, 'showSections'])->name('cms.sections');
    Route::get('/section/{id}',[CMSController::class,'showSectionForm'])->name('cms.sectionForm');
    Route::post('/section/update/{id}',[CMSController::class,'updateSection'])->name('cms.sectionUpdate');
});

//Route::group(['prefix' => LaravelLocalization::setLocale(), 'middleware' => [ 'localeSessionRedirect', 'localizationRedirect', 'localeViewPath' ]], function() {
    Route::group([], function() {
//    Route::get('/reset-password/{token}', [\App\Http\Controllers\APIs\NewPasswordController::class, 'showResetPasswordForm'])->name('reset.password.get');
//    Route::post('/update-password', [\App\Http\Controllers\APIs\NewPasswordController::class, 'submitResetPasswordForm'])->name('reset.password.post');
    Route::get('/{mainPath?}', [CMSController::class, 'returnViewWithLang']);

    Route::get('/{mainPath?}/{higherLevel?}', [CMSController::class, 'returnViewWithLang']);
    Route::get('/{mainPath?}/{higherLevel?}/{higherLevel2?}', [CMSController::class, 'returnViewWithLang']);
    Route::get('/{mainPath?}/{higherLevel?}/{higherLevel2?}/{higherLevel3?}', [CMSController::class, 'returnViewWithLang']);
    Route::get('/{mainPath?}/{higherLevel?}/{higherLevel2?}/{higherLevel3?}/{higherLevel4?}', [CMSController::class, 'returnViewWithLang']);
});
