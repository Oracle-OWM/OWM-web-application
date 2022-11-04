<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIs\NewPasswordController;
use App\Http\Controllers\APIs\Admin\NotificationsController;
use App\Http\Controllers\APIs\AdminsController;
use App\Http\Controllers\APIs\UsersController;
use App\Http\Controllers\APIs\AuthController;
use App\Http\Controllers\APIs\ServiceProvidersController;
use App\Http\Controllers\APIs\CategoriesController;
use App\Http\Controllers\APIs\CarModelsController;
use App\Http\Controllers\APIs\ProductsController;
use App\Http\Controllers\APIs\BannersController;
use App\Http\Controllers\APIs\FavouriteProductsController;
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
    Route::post('/admin/login', [AdminsController::class, 'login']);
    Route::post('/user/login', [UsersController::class, 'login']);
    Route::post('/user/register', [UsersController::class, 'register']);
    Route::post('/service-provider/login', [ServiceProvidersController::class, 'login']);
    Route::post('/service-provider/register', [ServiceProvidersController::class, 'register']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/me', [AuthController::class, 'me']);

    Route::group(['middleware'=>'jwt.verify'], function () {
        Route::post('/send-notification', [NotificationsController::class, 'sendNotificationToMobile']);


        Route::group(['prefix'=>'admin', ], function() {
            Route::group(['prefix'=>'banner'], function () {
                Route::get('/', [BannersController::class, 'getAllBanners']);
                Route::get('/{id}', [BannersController::class, 'getBanner']);
                Route::post('/', [BannersController::class, 'addBanner']);
                Route::put('/{id}', [BannersController::class, 'updateBanner']);
                Route::delete('/{id}', [BannersController::class, 'deleteBanner']);
            });

            Route::group(['prefix'=>'category'], function() {
                Route::get('/', [CategoriesController::class, 'getAllCategories']);
                Route::get('/{id}', [CategoriesController::class, 'getCategory']);
                Route::post('/', [CategoriesController::class, 'addCategory']);
                Route::put('/{id}', [CategoriesController::class, 'updateCategory']);
                Route::delete('/{id}', [CategoriesController::class, 'deleteCategory']);
            });

            Route::group(['prefix'=>'car-model'], function() {
                Route::get('/', [CarModelsController::class, 'getAllCarModels']);
                Route::get('/{id}', [CarModelsController::class, 'getCarModel']);
                Route::post('/', [CarModelsController::class, 'addCarModel']);
                Route::put('/{id}', [CarModelsController::class, 'updateCarModel']);
                Route::delete('/{id}', [CarModelsController::class, 'deleteCarModel']);
            });

            Route::group(['prefix'=>'service-provider'], function() {
                Route::get('/', [ServiceProvidersController::class, 'getAllServiceProviders']);
                Route::get('/{id}', [ServiceProvidersController::class, 'getServiceProvider']);
                Route::post('/', [ServiceProvidersController::class, 'register']);
                Route::put('/{id}', [ServiceProvidersController::class, 'updateServiceProvider']);
                Route::delete('/{id}', [ServiceProvidersController::class, 'deleteServiceProvider']);
            });

            Route::group(['prefix'=>'product'], function() {
                Route::get('/', [ProductsController::class, 'getAllProducts']);
                Route::get('/{id}', [ProductsController::class, 'getProduct']);
                Route::post('/', [ProductsController::class, 'addProduct']);
                Route::put('/{id}', [ProductsController::class, 'updateProduct']);
                Route::delete('/{id}', [ProductsController::class, 'deleteProduct']);
            });

            Route::group(['prefix'=>'user'], function() {
                Route::get('/', [UsersController::class, 'getAllUsers']);
                Route::get('/{id}', [UsersController::class, 'getUser']);
                Route::post('/', [UsersController::class, 'register']);
                Route::put('/{id}', [UsersController::class, 'updateUser']);
                Route::delete('/{id}', [UsersController::class, 'deleteUser']);
            });

            Route::get('/', [AdminsController::class, 'getAllAdmins']);
            Route::get('/{id}', [AdminsController::class, 'getAdmin']);
            Route::post('/', [AdminsController::class, 'addAdmin']);
            Route::put('/{id}', [AdminsController::class, 'updateAdmin']);
            Route::delete('/{id}', [AdminsController::class, 'deleteAdmin']);

        });

        Route::group(['prefix'=>'user',], function() {
            Route::group(['prefix'=>'banner'], function () {
                Route::get('/', [BannersController::class, 'getAllBanners']);
                Route::get('/{id}', [BannersController::class, 'getBanner']);
            });

            Route::group(['prefix'=>'category'], function() {
                Route::get('/', [CategoriesController::class, 'getAllCategories']);
                Route::get('/{id}', [CategoriesController::class, 'getCategory']);
            });

            Route::group(['prefix'=>'car-model'], function() {
                Route::get('/', [CarModelsController::class, 'getAllCarModels']);
                Route::get('/{id}', [CarModelsController::class, 'getCarModel']);
            });

            Route::group(['prefix'=>'favourite-product'], function() {
                Route::get('/', [FavouriteProductsController::class, 'getUserFavouriteProducts']);
                Route::post('/', [FavouriteProductsController::class, 'addProductToFavourites']);
                Route::delete('/', [FavouriteProductsController::class, 'deleteProductFromFavourites']);
            });

            Route::group(['prefix'=>'product'], function() {
                Route::get('/', [ProductsController::class, 'getAllProducts']);
                Route::get('/{id}', [ProductsController::class, 'getProduct']);
            });


            Route::post('/products-search', [ProductsController::class, 'productsSearch']);

            Route::get('/category-products/{category_id}', [ProductsController::class, 'getCategoryProducts']);

            Route::get('/{id}', [UsersController::class, 'getUser']);
//            Route::put('/{id}', [UsersController::class, 'updateUser']);
//            Route::delete('/{id}', [UsersController::class, 'deleteUser']);

        });

        Route::group(['prefix'=>'service-provider',], function() {
            Route::group(['prefix'=>'banner'], function () {
                Route::get('/', [BannersController::class, 'getAllBanners']);
                Route::get('/{id}', [BannersController::class, 'getBanner']);
                Route::post('/', [BannersController::class, 'addBanner']);
                Route::put('/{id}', [BannersController::class, 'updateBanner']);
                Route::delete('/{id}', [BannersController::class, 'deleteBanner']);
            });

            Route::group(['prefix'=>'category'], function() {
                Route::get('/', [CategoriesController::class, 'getAllCategories']);
                Route::get('/{id}', [CategoriesController::class, 'getCategory']);
            });

            Route::group(['prefix'=>'car-model'], function() {
                Route::get('/', [CarModelsController::class, 'getAllCarModels']);
                Route::get('/{id}', [CarModelsController::class, 'getCarModel']);
                Route::post('/', [CarModelsController::class, 'addCarModel']);
                Route::put('/{id}', [CarModelsController::class, 'updateCarModel']);
                Route::delete('/{id}', [CarModelsController::class, 'deleteCarModel']);
            });

            Route::group(['prefix'=>'favourite-product'], function() {
                Route::get('/', [FavouriteProductsController::class, 'getUserFavouriteProducts']);
                Route::post('/', [FavouriteProductsController::class, 'addProductToFavourites']);
                Route::delete('/', [FavouriteProductsController::class, 'deleteProductFromFavourites']);
            });

            Route::group(['prefix'=>'product'], function() {
                Route::get('/', [ProductsController::class, 'getAllProducts']);
                Route::get('/{id}', [ProductsController::class, 'getProduct']);
                Route::post('/', [ProductsController::class, 'addProduct']);
                Route::put('/{id}', [ProductsController::class, 'updateProduct']);
                Route::delete('/{id}', [ProductsController::class, 'deleteProduct']);
            });

            Route::post('/products-search', [ProductsController::class, 'productsSearch']);

            Route::get('/category-products/{category_id}', [ProductsController::class, 'getCategoryProducts']);

            Route::get('/{id}', [ServiceProvidersController::class, 'getServiceProvider']);
//            Route::put('/{id}', [ServiceProvidersController::class, 'updateServiceProvider']);
//            Route::delete('/{id}', [ServiceProvidersController::class, 'deleteServiceProvider']);

        });

        Route::post('/forgot-password', [NewPasswordController::class, 'forgotPassword']);
        Route::post('/reset-password', [NewPasswordController::class, 'reset']);
    });

});
