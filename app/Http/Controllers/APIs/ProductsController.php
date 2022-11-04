<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
use App\Http\Requests\products\AddBannerRequest;
use App\Http\Requests\products\AddProductRequest;
use App\Http\Requests\products\GetCategoryProductsRequest;
use App\Http\Requests\products\ProductsSearchRequest;
use App\Http\Requests\products\UpdateBannerRequest;
use App\Http\Requests\products\UpdateProductRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\CarModel;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    use GeneralTrait;
    use APIsTrait;

    public function getAllProducts()
    {
        $products = Product::all()->map(function($product){
            $product->category;
            $product->carModel;
            return $product;
        });
        if ($products->count()>= 1) {
            return $this->returnData('products', $products, 'All products has been returned successfully');
        } else {
            return $this->returnError('There is no any product', 'S004');
        }
    }

    public function getProduct(Request $request, $id)
    {
        $product = Product::find($request->id);
        if ($product) {
            $product->category;
            $product->carModel;
            return $this->returnData('product', $product, 'Product has been returned successfully');
        } else {
            return $this->returnError('This product is not exist', "S004");
        }
    }

    public function addProduct(AddProductRequest $request)
    {
        $request->validated();
        $password = password_hash($request->password, PASSWORD_DEFAULT);

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/products');
            } else {
                $imgPath = null;
            }

            $product = Product::create([
                'name' => $request->name,
                'category_id' => $request->category_id,
                'car_model_id' => $request->car_model_id,
                'store_name' => $request->store_name,
                'price' => $request->price,
                'city' => $request->city,
                'offer_percentage' => $request->offer_percentage,
                'desc' => $request->desc,
                'rate' => $request->rate,
                'image' => $imgPath,
            ]);

            if($product) {
                return $this-> returnSuccessMessage('Product successfully added');
            } else {
                return $this-> returnError('Failed to add product', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function updateProduct(UpdateProductRequest $request, $id)
    {
        $request->validated();

        //Get Product
        $product = Product::find($id);
        if (!$product)
            return $this->returnError('This product is not exist anymore', 'S004');

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/products');
            } else {
                $imgPath = null;
            }
            $updated = $product->update([
                'name' => $request->name,
                'category_id' => $request->category_id,
                'car_model_id' => $request->car_model_id,
                'store_name' => $request->store_name,
                'price' => $request->price,
                'city' => $request->city,
                'offer_percentage' => $request->offer_percentage,
                'desc' => $request->desc,
                'rate' => $request->rate,
                'image' => $imgPath,
            ]);

            if($updated) {
                return $this-> returnSuccessMessage('Product successfully updated');
            } else {
                return $this-> returnError('Failed to add product', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function deleteProduct($id)
    {
        $product = Product::find($id);   // Product::where('id','$request->id') -> first();
        if (!$product)
            return $this->returnError('This product is not exist anymore', 'S004');

        $deleted = $product->delete();
        if ($deleted)
            return $this->returnSuccessMessage('Product No. ' . "$id" . ' has been deleted successfully');
        else
            return $this->returnError('This product can\'t be deleted', 'S003');
    }

    public function getCategoryProducts(GetCategoryProductsRequest $request) {
        $request->validated();

        $category_products = Category::find($request->category_id)->products;

        if (!$category_products || $category_products->count()<1)
            return $this->returnError('There are no products exist', 'S004');
        return $this->returnData('category_products', $category_products, 'Products have been returned successfully');
    }

    public function productsSearch(ProductsSearchRequest $request) {
        $products1 = Product::where('name', 'like', '%' . $request->keyword . '%')
                ->orWhere('store_name', 'like', '%' . $request->keyword . '%')
                ->orWhere('price', 'like', '%' . $request->keyword . '%')
                ->orWhere('city', 'like', '%' . $request->keyword . '%')
                ->orWhere('rate', 'like', '%' . $request->keyword . '%')
        ->get();
        $products2CarModel = CarModel::where('car_manufacture', 'like', '%' . $request->keyword . '%')
                ->orWhere('model_name', 'like', '%' . $request->keyword . '%')
                ->orWhere('car_year', 'like', '%' . $request->keyword . '%')
        ->get();
//        $products = [];
//        foreach ($products2CarModel as $carModel) {
//        }
            $products = $products1->merge($products2CarModel->products)->all();

//        if($products!=null && $products->count()>=1) {
//        return $this->returnData('products', [$products1, $products2CarModel], 'Products have been returned successfully');
        return $this->returnData('products', $products, 'Products have been returned successfully');
//        } else {
//            return $this->returnError('There are no products exist', 'S004');
//        }
    }

}
