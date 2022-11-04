<?php

namespace App\Http\Requests\products;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class AddProductRequest extends FormRequest
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
            'category_id'                   => [ 'required', 'exists:categories,id', ],
            'car_model_id'                  => [ 'required', 'exists:car_models,id', ],
            'store_name'                    => [ 'required', 'string', ],
            'price'                         => [ 'required', 'numeric', ],
            'offer_percentage'              => [ 'required', 'integer', ],
            'desc'                          => [ 'required', 'string', ],
            'rate'                          => [ 'required', 'integer', ],
            'image'                         => [ 'nullable', ],
        ];
    }


    public function messages()
    {
        return [
            'category_id.required'               => 'Field is required',
            'category_id.exist'                  => 'This category doesn\'t exist',

            'car_model_id.required'              => 'Field is required',
            'car_model_id.exist'                 => 'This category doesn\'t exist',

            'store_name.required'               => 'Field is required',
            'store_name.string'                 => 'Field must be string',

            'price.required'                    => 'Field is required',
            'price.numeric'                     => 'Field must be numeric',

            'offer_percentage.required'         => 'Field is required',
            'offer_percentage.integer'          => 'Field must be integer',

            'desc.required'                     => 'Field is required',
            'desc.string'                       => 'Field must be string',

            'rate.required'                     => 'Field is required',
            'rate.integer'                      => 'Field must be integer',

//            'image.image'                   =>'Choose a correct file according to image extensions',
        ];
    }
}