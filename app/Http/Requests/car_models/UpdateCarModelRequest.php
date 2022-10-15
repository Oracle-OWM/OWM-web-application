<?php

namespace App\Http\Requests\car_models;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class UpdateCarModelRequest extends FormRequest
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
            'car_manufacture'               => [ 'required', 'string', ],
            'car_year'                      => [ 'required', ],
            'model_name'                    => [ 'required', 'string', ],
            'image'                         => [ 'nullable', ],        ];
    }


    public function messages()
    {
        return [
            'model_name.required'               => 'Field is required',
            'model_name.string'                 => 'Field must be string',

            'car_year.required'                 => 'Field is required',

            'car_manufacture.required'          => 'Field is required',
            'car_manufacture.string'            => 'Field must be string',

//            'image.image'                   =>'Choose a correct file according to image extensions',
        ];
    }
}
