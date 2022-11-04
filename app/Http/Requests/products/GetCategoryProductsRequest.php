<?php

namespace App\Http\Requests\products;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class GetCategoryProductsRequest extends FormRequest
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
        ];
    }


    public function messages()
    {
        return [
            'category_id.required'               => 'Field is required',
            'category_id.exist'                  => 'This category doesn\'t exist',
        ];
    }
}
