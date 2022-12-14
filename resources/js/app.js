/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');
// window.Pusher = require('pusher-js');

// let ws = new WebSocket('wss://s'+window.location.hostname+':6001/laravel-websockets/websocket-channel');
// let ws = new WebSocket('wss:/s/'+window.location.hostname+':6001/laravel-websockets');
// let ws = new WebSocket('ws://127.0.0.1:6001/laravel-websockets?channel=websocket-channel');


let ws = new WebSocket(`ws://${window.location.hostname}:6001/app/livepost_key?protocol=7&client=js&version=7.5.0&flash=false`);

ws.onopen = function(e) {
    //Subscribe to the channel
    console.log('opened!');
    console.log('open event',e);
    ws.send(JSON.stringify({"event":"pusher:subscribe","data":{"auth":"","channel":"websocket-channel"}}));
    // ws.send(JSON.stringify({"event":"pusher:subscribe","data":"{\"auth\":\"\",\"channel\":\"websocket-channel\"}"}));
    // ws.send(JSON.stringify({"command":"pusher:subscribe","data":"{\"auth\":\"\",\"channel\":\"websocket-channel\"}"}));
    // ws.send(JSON.stringify({"command": "pusher:subscribe","identifier":"{\"channel\":\"websocket-channel\"}"}));
    // ws.send(JSON.stringify({"command": "subscribe","identifier":"{\"channel\":\"websocket-channel\"}"}));
    // console.log('sent!');
    // ws.send(JSON.stringify({"command": "listen","identifier":"{\"channel\":\"websocket-channel\"}"}));
    // console.log('sent!');
    // ws.send(JSON.stringify({"command": "subscribe","identifier":"{\"channel\":\"websocket-channel\", \"event\":\"NewMessage\"}"}));
    // console.log('sent!');
    // ws.send(JSON.stringify({"command": "subscribe","identifier":"{\"channel\":\"websocket-channel\", \"event\":\".NewMessage\"}"}));
    // console.log('sent!');
    // ws.send(JSON.stringify({"command": "listen","identifier":"{\"channel\":\"websocket-channel\", \"event\":\"NewMessage\"}"}));
    // console.log('sent!');
    // ws.send(JSON.stringify({"command": "listen","identifier":"{\"channel\":\"websocket-channel\", \"event\":\"NewMessage\"}"}));
    // console.log('sent!');
    // ws.send(JSON.stringify({"channel": "websocket-channel", "event":"NewMessage"}));
    console.log('sent!');
}

ws.onmessage = function(msg) {
    console.log('msg event',msg);
    console.log('message',JSON.parse(msg.data).data && JSON.parse(JSON.parse(msg.data).data).message);
}

// {"event":"pusher:subscribe","data":{"auth":"","channel":"websocket-channel"}}
//
// const channel = Echo.channel('websocket-channel');
//
//
// window.Echo.channel('websocket-channel')
//     .listen('.NewMessage', e => {
//         console.log('event',e);
//         console.log('messaage',e.message);
//     });
//
// $message = null;
// channel.listen('.NewMessage', e => {
//     console.log(e);
//     console.log('messaage',e.message);
//     console.log('messaage',e);
//     $message = e.message;
// }).subscribed(()=>{
//     console.log('subscribed!')
// });

/**
* Next, we will create a fresh React component instance and attach it to
* the page. Then, you may begin adding MainComponents to this application
* or customize the JavaScript scaffolding to fit your unique needs.
*/
// $page_no2 = `{{<?php echo unserialize(${document.currentScript.getAttribute('supportedLocales')}); ?>}}`;
// $supportedLocales = document.currentScript.getAttribute('supportedLocales');
require('./App/App');

