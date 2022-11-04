<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
use App\Http\Requests\banners\AddBannerRequest;
use App\Http\Requests\banners\UpdateBannerRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\Banner;
use Illuminate\Http\Request;

class BannersController extends Controller
{
    use GeneralTrait;
    use APIsTrait;

    public function getAllBanners()
    {
        $banners = Banner::all()->map(function($banner){
//            $banner->department;
            return $banner;
        });
        if ($banners->count()>= 1) {
            return $this->returnData('banners', $banners, 'All banners has been returned successfully');
        } else {
            return $this->returnError('There is no any banner', 'S004');
        }
    }

    public function getBanner(Request $request, $id)
    {
        $banner = Banner::find($request->id);
        if ($banner) {
//            $banner->department;
            return $this->returnData('banner', $banner, 'Banner has been returned successfully');
        } else {
            return $this->returnError('This banner is not exist', "S004");
        }
    }

    public function addBanner(AddBannerRequest $request)
    {
        $request->validated();
        $password = password_hash($request->password, PASSWORD_DEFAULT);

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/banners');
            } else {
                $imgPath = null;
            }

            $banner = Banner::create([
                'image' => $imgPath,
            ]);

            if($banner) {
                return $this-> returnSuccessMessage('Banner successfully added');
            } else {
                return $this-> returnError('Failed to add banner', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function updateBanner(UpdateBannerRequest $request, $id)
    {
        $request->validated();

        //Get Banner
        $banner = Banner::find($id);
        if (!$banner)
            return $this->returnError('This banner is not exist anymore', 'S004');

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/banners');
            } else {
                $imgPath = null;
            }
            $updated = $banner->update([
                'image' => $imgPath,
            ]);

            if($updated) {
                return $this-> returnSuccessMessage('Banner successfully updated');
            } else {
                return $this-> returnError('Failed to add banner', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function deleteBanner($id)
    {
        $banner = Banner::find($id);   // Banner::where('id','$request->id') -> first();
        if (!$banner)
            return $this->returnError('This banner is not exist anymore', 'S004');

        $deleted = $banner->delete();
        if ($deleted)
            return $this->returnSuccessMessage('Banner No. ' . "$id" . ' has been deleted successfully');
        else
            return $this->returnError('This banner can\'t be deleted', 'S003');
    }
}
