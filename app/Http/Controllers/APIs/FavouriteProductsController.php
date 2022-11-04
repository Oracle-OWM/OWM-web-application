<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
use App\Http\Requests\favourite_products\AddFavouriteProductRequest;
use App\Http\Requests\favourite_products\GetUserSellerFavouriteProductsRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
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
            $favouriteProducts = UserSellerFavouriteProduct::where('is_seller', '=', true)->orWhere('user_id', '=', $request->user_id)->get();

            if($favouriteProducts) {
                return $this-> returnSuccessMessage('Favourite Product successfully returned');
            } else {
                return $this-> returnError('Failed to add product', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function addProductToFavourites(AddFavouriteProductRequest $request) {

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

    public function deleteProductFromFavourites(Request $request)
    {
        $favouriteProduct = UserSellerFavouriteProduct::find($id);   // Product::where('id','$request->id') -> first();
        if (!$favouriteProduct)
            return $this->returnError('This product is not exist anymore', 'S004');

        $deleted = $favouriteProduct->delete();
        if ($deleted)
            return $this->returnSuccessMessage('Product No. ' . "$id" . ' has been deleted successfully');
        else
            return $this->returnError('This product can\'t be deleted', 'S003');
    }
}
