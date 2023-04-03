# Robot Pixels

## Setup 
* Setup
1. duplicate the .env-example file with name .env

2. run the following Commands
```
$ composer i
$ npm i
$ php artisan key:generate
$ php artisan jwt:secrete
$ php artisan migrate
```

## Run the serve
1. update the hostname and the portname in the resources/js/App/APIs.js too
2. run the server
```
$ php artisan serve --host=<hostname> --port=<portname>
```
