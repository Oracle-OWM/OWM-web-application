<?php

namespace App\Http\Controllers\APIs\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\car_models\AddCarModelRequest;
use App\Http\Requests\car_models\GetCarManufactureDataRequest;
use App\Http\Requests\car_models\UpdateCarModelRequest;
use App\Http\Traits\APIsTrait;
use App\Http\Traits\GeneralTrait;
use App\Models\CarModel;
use Illuminate\Http\Request;

class AdminCarModelsController extends Controller
{
    use GeneralTrait;
    use APIsTrait;

    public function getAllCarModels()
    {
        $car_models = CarModel::all()->map(function($car_model){
//            $car_model->department;
            return $car_model;
        });
        if ($car_models->count()>= 1) {
            return $this->returnData('car_models', $car_models, 'All car models has been returned successfully');
        } else {
            return $this->returnError('There is not any car model', 'S004');
        }
    }

    public function getCarManufactureData(GetCarManufactureDataRequest $request)
    {
        $request->validated();

        $carManufactureModels = CarModel::where('car_manufacture', 'like', '%'.$request->car_manufacture.'%')->get()->pluck('model_name');
        $carManufactureYears = CarModel::where('car_manufacture', 'like', '%'.$request->car_manufacture.'%')->get()->pluck('car_year');
        $carManufactureData = [
            'models'=>$carManufactureModels,
            'years'=>$carManufactureYears,
        ];
        if (count($carManufactureModels)>= 1) {
            return $this->returnData('car_manufacture_data', $carManufactureData, 'All car models has been returned successfully');
        } else {
            return $this->returnError('There is not any car model', 'S004');
        }
    }

    public function getAllCarManufactures()
    {
        $carManufactures = CarModel::all()->pluck('car_manufacture');
        if (count($carManufactures)>= 1) {
            return $this->returnData('car_manufacture_data', $carManufactures, 'All car models has been returned successfully');
        } else {
            return $this->returnError('There is not any car model', 'S004');
        }
    }

    public function getCarModel(Request $request, $id)
    {
        $car_model = CarModel::find($request->id);
        if ($car_model) {
//            $car_model->department;
            return $this->returnData('car_model', $car_model, 'Car model has been returned successfully');
        } else {
            return $this->returnError('This car model is not exist', "S004");
        }
    }

    public function addCarModel(AddCarModelRequest $request)
    {
        $request->validated();
        $password = password_hash($request->password, PASSWORD_DEFAULT);

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/car_models');
            } else {
                $imgPath = null;
            }
            $flag = 1;
            foreach (CarModel::all() as $carModel) {
                if($carModel->car_manufacture == $request->car_manufacture && $carModel->car_year == $request->car_year && $carModel->model_name == $request->model_name) {
                    $flag = 0;
                }
            }
            if ($flag) {
                $car_model = CarModel::create([
                    'car_manufacture' => $request->car_manufacture,
                    'car_year' => $request->car_year,
                    'model_name' => $request->model_name,
                    'image' => $imgPath,
                ]);
            } else
                return $this-> returnError('This car model is already exist', 'S003');

            if($car_model) {
                return $this-> returnSuccessMessage('Car model successfully added');
            } else {
                return $this-> returnError('Failed to add car model', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function updateCarModel(UpdateCarModelRequest $request, $id)
    {
        $request->validated();

        //Get CarModel
        $car_model = CarModel::find($id);
        if (!$car_model)
            return $this->returnError('This car model is not exist anymore', 'S004');

        try {
            if($request->hasFile('image')) {
                $imgPath = $this->saveFile($request->image, 'public/images/car_models');
            } else {
                $imgPath = null;
            }
            $updated = $car_model->update([
                'car_manufacture' => $request->car_manufacture,
                'car_year' => $request->car_year,
                'model_name' => $request->model_name,
                'image' => $imgPath,
            ]);

            if($updated) {
                return $this-> returnSuccessMessage('Car model successfully updated');
            } else {
                return $this-> returnError('Failed to add car model', 'S003');
            }
        } catch (\Exception $e) {
            return $this->returnError($e->getCode(), $e->getMessage());
        }
    }

    public function deleteCarModel($id)
    {
        $car_model = CarModel::find($id);   // CarModel::where('id','$request->id') -> first();
        if (!$car_model)
            return $this->returnError('This car model is not exist anymore', 'S004');

        $deleted = $car_model->delete();
        if ($deleted)
            return $this->returnSuccessMessage('Car model No. ' . "$id" . ' has been deleted successfully');
        else
            return $this->returnError('This car model can\'t be deleted', 'S003');
    }

}
