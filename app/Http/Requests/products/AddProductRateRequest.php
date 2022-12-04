<?php

namespace App\Http\Requests\products;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class AddProductRateRequest extends FormRequest
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
            'is_seller'                         => [ 'required', 'boolean', ],
            'user_id'                           => [ 'required', ],
            'product_id'                        => [ 'required', 'exists:products,id', ],
            'rate'                              => [ 'required', 'integer',  ],
        ];
    }


    public function messages()
    {
        return [
            'is_seller.required'                => 'Field is required',

            'user_id.required'                  => 'Field is required',

            'product_id.required'               => 'Field is required',
            'product_id.exist'                  => 'This product doesn\'t exist',

            'rate.required'                     => 'Field is required',
            'rate.integer'                      => 'Field must be integer',
        ];
    }
}
