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
            'service_provider_id'           => [ 'required', 'exists:service_providers,id', ],
            'category_id'                   => [ 'required', 'exists:categories,id', ],
            'car_model_id'                  => [ 'required', 'exists:car_models,id', ],
            'city'                          => [ 'required', 'string', ],
            'price'                         => [ 'required', 'numeric', ],
            'offer_percentage'              => [ 'required', 'integer', ],
            'desc'                          => [ 'required', 'string', Rule::unique('products', 'desc'), ],
            'image'                         => [ 'required', ],
            'gallery'                       => [ 'nullable', ],
        ];
    }


    public function messages()
    {
        return [
            'service_provider_id.required'       => 'Field is required',
            'service_provider_id.exist'          => 'This service provider doesn\'t exist',

            'category_id.required'               => 'Field is required',
            'category_id.exist'                  => 'This category doesn\'t exist',

            'car_model_id.required'              => 'Field is required',
            'car_model_id.exist'                 => 'This category doesn\'t exist',

            'city.required'                     => 'Field is required',
            'city.string'                       => 'Field must be string',

            'price.required'                    => 'Field is required',
            'price.numeric'                     => 'Field must be numeric',

            'offer_percentage.required'         => 'Field is required',
            'offer_percentage.integer'          => 'Field must be integer',

            'desc.required'                     => 'Field is required',
            'desc.string'                       => 'Field must be string',

            'image.required'                     => 'Field is required',
//            'image.image'                   =>'Choose a correct file according to image extensions',
        ];
    }
}
