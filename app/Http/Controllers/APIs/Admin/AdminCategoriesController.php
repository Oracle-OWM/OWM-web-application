<?php

namespace App\Http\Controllers\APIs\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\categories\AddCategoryRequest;
use App\Http\Requests\categories\UpdateCategoryRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\Category;
use Illuminate\Http\Request;

class AdminCategoriesController extends Controller
{
    use APIsTrait;
    use GeneralTrait;

    public function getAllCategories()
    {
        $categories = Category::all()->map(function($category){
//            $category->department;
            return $category;
        });
        if ($categories->count()>= 1) {
            return $this->returnData('categories', $categories, 'All categories has been returned successfully');
        } else {
            return $this->returnError('There is not any category', 'S004');
        }
    }

    public function getCategory(Request $request, $id)
    {
        $category = Category::find($request->id);
        if ($category) {
//            $category->department;
            return $this->returnData('category', $category, 'Category has been returned successfully');
        } else {
            return $this->returnError('This category is not exist', "S004");
        }
    }

    public function addCategory(AddCategoryRequest $request)
    {
        $request->validated();
        $password = password_hash($request->password, PASSWORD_DEFAULT);

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/categories');
            } else {
                $imgPath = null;
            }
            $category = Category::create([
                'name' => $request->name,
                'image' => $imgPath,
            ]);

            if($category) {
                return $this-> returnSuccessMessage('Category successfully added');
            } else {
                return $this-> returnError('Failed to add category', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function updateCategory(UpdateCategoryRequest $request, $id)
    {
        $request->validated();

        //Get Category
        $category = Category::find($id);
        if (!$category)
            return $this->returnError('This category is not exist anymore', 'S004');

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/categories');
            } else {
                $imgPath = null;
            }
            $updated = $category->update([
                'name' => $request->name,
                'image' => $imgPath,
            ]);

            if($updated) {
                return $this-> returnSuccessMessage('Category successfully updated');
            } else {
                return $this-> returnError('Registration Failed', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function deleteCategory($id)
    {
        $category = Category::find($id);   // Category::where('id','$request->id') -> first();
        if (!$category)
            return $this->returnError('This category is not exist anymore', 'S004');

        $deleted = $category->delete();
        if ($deleted)
            return $this->returnSuccessMessage('Category No. ' . "$id" . ' has been deleted successfully');
        else
            return $this->returnError('This category can\'t be deleted', 'S003');
    }

}
