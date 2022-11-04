<?php

namespace App\Http\Requests\favourite_products;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class DeleteFavouriteProductRequest extends FormRequest
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
            'is_seller'                     => [ 'required', 'boolean', ],
        ];
    }


    public function messages()
    {
        return [
            'user_id.required'                      => 'Field is required',
            'is_seller.required'                    => 'Field is required',
            'is_seller.boolean'                     => 'Field must be boolean',
        ];
    }
}
