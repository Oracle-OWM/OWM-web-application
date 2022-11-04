<?php

namespace App\Http\Requests\favourite_products;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class AddDeleteFavouriteProductRequest extends FormRequest
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
            'user_id'                       => [ 'required', ],
            'product_id'                    => [ 'required', 'exists:products,id', ],
            'is_seller'                     => [ 'required', 'boolean', ],
        ];
    }


    public function messages()
    {
        return [
            'user_id.required'                      => 'Field is required',

            'product_id.required'                   => 'Field is required',
            'product_id.exist'                      => 'This product doesn\'t exist',

            'is_seller.required'                    => 'Field is required',
            'is_seller.boolean'                     => 'Field must be boolean',
        ];
    }
}
