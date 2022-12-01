<?php

namespace App\Http\Requests\car_models;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class GetCarManufactureDataRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'car_manufacture'               => [ 'required', 'string', 'exists:car_models,car_manufacture', ],
        ];
    }


    public function messages()
    {
        return [
            'car_manufacture.required'          => 'Field is required',
            'car_manufacture.string'            => 'Field must be string',
            'car_manufacture.exists'            => 'This car manfufacture doesn\'t exist',

//            'image.image'                   =>'Choose a correct file according to image extensions',
        ];
    }
}
