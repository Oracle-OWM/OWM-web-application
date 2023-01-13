/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

// const port = 6001;
// let ws = new WebSocket(`ws://${window.location.hostname}:${port}/app/livepost_key?protocol=7&client=js&version=7.5.0&flash=false`);
//
// ws.onopen = function(e) {
//     //Subscribe to the channel
//     console.log('opened!');
//     console.log('open event',e);
//     ws.send(JSON.stringify({"event":"pusher:subscribe","data":{"auth":"","channel":"websocket-channel"}}));
//     console.log('sent!');
// }
//
// ws.onmessage = function(msg) {
//     console.log('message event',msg);
//     console.log('message',JSON.parse(msg.data).data && JSON.parse(JSON.parse(msg.data).data).message);
// }

/**
* Next, we will create a fresh React component instance and attach it to
* the page. Then, you may begin adding MainComponents to this application
* or customize the JavaScript scaffolding to fit your unique needs.
*/
// $page_no2 = `{{<?php echo unserialize(${document.currentScript.getAttribute('supportedLocales')}); ?>}}`;
// $me = JSON.parse(msg.data).data && JSON.parse(JSON.parse(msg.data).data).message;
require('./App/App');

