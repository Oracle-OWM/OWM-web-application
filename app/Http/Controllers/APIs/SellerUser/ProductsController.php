<?php

namespace App\Http\Controllers\APIs\SellerUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\products\AddBannerRequest;
use App\Http\Requests\products\AddProductRateRequest;
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
use App\Models\ServiceProvider;
use App\Models\User;
use App\Models\UserProductRate;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    use GeneralTrait;
    use APIsTrait;

    public function getAllProducts()
    {
        $products = Product::where('state', '=', 'approved')->get()->map(function ($product1) {
            if(count($product1->usersOrSellerRates)>=1) {
                $rate = $product1->usersOrSellerRates->sum('rate')/count($product1->usersOrSellerRates);
                if($rate==null) {
                    $rate=0;
                }
            } else {
                $rate = 0;
            }
            return [
                'id' =>$product1->id,
                'name' =>$product1->name,
                'price' =>$product1->price,
                'offer_percentage' =>$product1->offer_percentage,
                'rate' =>$rate,
                'state' =>$product1->state,
                'image' =>$product1->image,
            ];
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
        if(count($product->usersOrSellerRates)>=1) {
            $rate = $product->usersOrSellerRates->sum('rate')/count($product->usersOrSellerRates);
        } else {
            $rate = 0;
        }
        if ($product) {
            $product->gallery = json_decode($product->gallery);
            $data = [
                'name'=>$product->name,
                'image'=>$product->image,
                'gallery'=>$product->gallery,
                'price'=>$product->price,
                'city'=>$product->city,
                'offer_percentage'=>$product->offer_percentage,
                'desc'=>$product->desc,
                'rate'=> $rate,
                'state'=>$product->state,
                'seller_details'=> [
                    'store_name'=>$product->serviceProvider->store_name,
                    'store_location'=> $product->serviceProvider->store_location,
                    'store_phone_number'=> $product->serviceProvider->store_phone_number,
                    'store_address'=> $product->serviceProvider->store_address,
                    'store_image'=> $product->serviceProvider->store_image,
                ],
                'category'=>[
                    'id'=>$product->category->id,
                    'name'=>$product->category->name,
                    'image'=>$product->category->image,
                ],
                'car_model'=>[
                    'id'=>$product->carModel->id,
                    'car_manufacture'=>$product->carModel->car_manufacture,
                    'model_name'=>$product->carModel->model_name,
                    'car_year'=>$product->carModel->car_year,
                    'image'=>$product->carModel->image,
                ],
            ];
            return $this->returnData('product', $data, 'Product has been returned successfully');
        } else {
            return $this->returnError('This product is not exist', "S004");
        }
    }

    public function addProductRate(AddProductRateRequest $request)
    {
        $request->validated();
        try {
            $usersProductsRates = UserProductRate::all();
            if($usersProductsRates && $usersProductsRates->count()>=1) {
                foreach ($usersProductsRates as $productRate) {
                    if($productRate['is_seller']==$request->is_seller && $productRate['user_id']==$request->user_id && $productRate['product_id']==$request->product_id) {
                        return $this->returnError('This product rate has been already added', 'S004');
                    }
                }
            }
            if($request->is_seller) {
                $user_or_seller = ServiceProvider::find($request->user_id);
            } else {
                $user_or_seller = User::find($request->user_id);
            }

            if (!$user_or_seller || $user_or_seller==null) {
                return $this->returnError('This user or seller doesn\'t exist', 'S004');
            }

            $userProductRate = UserProductRate::create([
                'is_seller' => $request->is_seller,
                'user_id' => $request->user_id,
                'product_id' => $request->product_id,
                'rate' => $request->rate,
            ]);

            if($userProductRate) {
                return $this-> returnSuccessMessage('Product rate successfully added');
            } else {
                return $this-> returnError('Failed to add product rate', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function addProduct(AddProductRequest $request)
    {
        $request->validated();
        $password = password_hash($request->password, PASSWORD_DEFAULT);

//             return $this->returnData('product', var_dump($_FILES), 'Product has been returned successfully');
//         return [$request->name,$request->gallery];
        try {
            if($request->gallery!=null) {
                $gallery = [];
                foreach ($request->file('gallery') as $imagefile) {
                    $path = $imagefile->store('/public/images/products', ['disk' =>   'my_files']);
                    $gallery[] = $path;
                }
            }

            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/products');
            } else {
                $imgPath = null;
            }


            $product = Product::create([
                'name' => $request->name,
                'service_provider_id' => $request->service_provider_id,
                'category_id' => $request->category_id,
                'car_model_id' => $request->car_model_id,
                'price' => $request->price,
                'city' => $request->city,
                'offer_percentage' => $request->offer_percentage,
                'desc' => $request->desc,
                'image' => $imgPath,
                'gallery' => json_encode($gallery),
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
                'price' => $request->price,
                'city' => $request->city,
                'offer_percentage' => $request->offer_percentage,
                'desc' => $request->desc,
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

    public function getCategoryProducts($category_id) {
        $category_products = Category::find($category_id)->products->map->only(['id', 'name', 'price', 'state', 'offer_percentage', 'rate', 'image']);

        if (!$category_products || $category_products->count()<1)
            return $this->returnError('There are no products exist', 'S004');
        return $this->returnData('category_products', $category_products, 'Products have been returned successfully');
    }

    public function getAllServiceProviderProducts($service_provider_id)
    {
        $serviceProviderProducts = ServiceProvider::find($service_provider_id)->products->map->only(['id', 'name', 'price', 'offer_percentage', 'rate', 'state', 'image']);
        if ($serviceProviderProducts->count()>= 1) {
            return $this->returnData('service_provider_products', $serviceProviderProducts, 'All service providers has been returned successfully');
        } else {
            return $this->returnError('There is no any product for this service provider', 'S004');
        }
    }

    public function productsSearch(ProductsSearchRequest $request) {
        $products1 = Product::where('name', 'like', '%' . $request->keyword . '%')
            ->orWhere('price', '=', $request->keyword)
            ->orWhere('city', 'like', '%' . $request->keyword . '%')
            ->get()->filter(function($product) {
                if($product->state==='approved') {
                    return $product;
                }
            })
        ->map(function ($product1) {
            if(count($product1->usersOrSellerRates)>=1) {
                $rate = $product1->usersOrSellerRates->sum('rate')/count($product1->usersOrSellerRates);
            } else {
                $rate = 0;
            }
            return [
                'id' =>$product1->id,
                'name' =>$product1->name,
                'price' =>$product1->price,
                'offer_percentage' =>$product1->offer_percentage,
                'rate' =>$rate,
                'state' =>$product1->state,
                'image' =>$product1->image,
            ];
        });

        $products2CarModel = CarModel::where('car_manufacture', 'like', '%' . $request->keyword . '%')
                ->orWhere('model_name', 'like', '%' . $request->keyword . '%')
                ->orWhere('car_year', '=', $request->keyword)
        ->get();
        $products2 = [];
        foreach ($products2CarModel as $carModel) {
            foreach ($carModel->products as $product2) {
                if($product2->state==='approved'){
                    if(count($product2->usersOrSellerRates)>=1) {
                        $rate = $product2->usersOrSellerRates->sum('rate')/count($product2->usersOrSellerRates);
                    } else {
                        $rate = 0;
                    }
                    $products2[] = [
                        'id' =>$product2->id,
                        'name' =>$product2->name,
                        'price' =>$product2->price,
                        'offer_percentage' =>$product2->offer_percentage,
                        'rate' =>$rate,
                        'state' =>$product2->state,
                        'image' =>$product2->image,
                    ];
                }
            }
        }
        $products = collect($products1)->merge($products2)->all();
//        if($products!=null && $products->count()>=1) {
            return $this->returnData('products', $products, 'Products have been returned successfully');
//        } else {
//            return $this->returnError('There are no products exist', 'S004');
//        }
    }

}
