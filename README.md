# Robot Pixels

## Commands
* setup
```
1. duplicate the .env-example file with name .env
2. run the following command
`composer i`
3. `npm i`
4. `php artisan key:generate`
5. `php artisan migrate`
6. `php artisan jwt:generate`
```
* Run the serve
update the hostname and the portname in the resources/js/App/APIs.js too
```
$ php artisan serve --host=<hostname> --port=<portname>
$ php artisan websockets:serve --host=<hostname>
```
