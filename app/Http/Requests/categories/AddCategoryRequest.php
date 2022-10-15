<?php

namespace App\Http\Requests\categories;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class AddCategoryRequest extends FormRequest
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
            'name'                => [ 'required', 'string', Rule::unique('categories', 'name'), ],
            'image'               => [ 'nullable', ],
        ];
    }


    public function messages()
    {
        return [
            'name.required'               => 'Field is required',
            'name.string'                 => 'Field must be string',
            'name.unique'                      => 'This email is exist',

//            'image.image'                   =>'Choose a correct file according to image extensions',
        ];
    }
}
