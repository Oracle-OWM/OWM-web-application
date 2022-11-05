<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
use App\Http\Requests\favourite_products\AddDeleteFavouriteProductRequest;
use App\Http\Requests\favourite_products\AddFavouriteProductRequest;
use App\Http\Requests\favourite_products\GetUserSellerFavouriteProductsRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\Product;
use App\Models\ServiceProvider;
use App\Models\User;
use App\Models\UserSellerFavouriteProduct;
use Illuminate\Http\Request;

class FavouriteProductsController extends Controller
{
    use GeneralTrait;
    use APIsTrait;

    public function getUserFavouriteProducts(GetUserSellerFavouriteProductsRequest $request) {
        $request->validated();
        try {
            $favouriteProducts = UserSellerFavouriteProduct::where('user_id', '=', $request->user_id)->where('is_seller', '=', $request->is_seller)->get()->map(function ($favouriteProduct) {
                return Product::find($favouriteProduct->product_id);
            });

            if($favouriteProducts && $favouriteProducts->count()>=1) {
                return $this->returnData('favourite_products', $favouriteProducts, 'Favourite Product successfully returned');
            } else {
                return $this-> returnError('There is no products', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function addProductToFavourites(AddDeleteFavouriteProductRequest $request) {

        $request->validated();

        try {
            if($request->is_seller) {
                $user_or_seller = ServiceProvider::find($request->user_id);
            } else {
                $user_or_seller = User::find($request->user_id);
            }

            if (!$user_or_seller || $user_or_seller==null) {
                return $this->returnError('This user or seller doesn\'t exist', 'S004');
            }

            $favouriteProduct = UserSellerFavouriteProduct::create([
                'is_seller' => $request->is_seller,
                'user_id' => $request->user_id,
                'product_id' => $request->product_id,
            ]);

            if($favouriteProduct) {
                return $this-> returnSuccessMessage('Product successfully added To Favourite');
            } else {
                return $this-> returnError('Failed to add product', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function deleteProductFromFavourites(AddDeleteFavouriteProductRequest $request)
    {
        $favouriteProduct = UserSellerFavouriteProduct::where('user_id','=',$request->user_id)->where('is_seller','=',$request->is_seller)->where('product_id','=',$request->product_id)->first();   // Product::where('id','$request->id') -> first();
        if (!$favouriteProduct)
            return $this->returnError('This product is not exist anymore', 'S004');

        $deleted = $favouriteProduct->delete();
        if ($deleted)
            return $this->returnSuccessMessage('Product No. ' . "$request->product_id" . ' has been removed from fav. successfully');
        else
            return $this->returnError('This product can\'t be deleted', 'S003');
    }
}
