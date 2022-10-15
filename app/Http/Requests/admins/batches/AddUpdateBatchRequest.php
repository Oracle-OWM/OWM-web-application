<?php

namespace App\Http\Requests\admins\batches;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AddUpdateBatchRequest extends FormRequest
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
            'number'                        => [ 'required', 'integer' ],
            'table_link'                    => [ 'nullable', ],
            'department_id'                 => [ 'nullable', 'integer', 'exists:departments,id' ],
            'academic_year'                 => [ 'required', 'string', ],
        ];
    }


    public function messages()
    {
        return [
            'number.required'                   => 'Field is required',
            'number.integer'                    => 'Field must be integer',

            'table_link.url'                    => 'Field must be URL',

//            'department_id.required'            => 'Field is required',
            'department_id.integer'             => 'Field must be integer',
            'department_id.exists'              => 'This department ID does not exist',

            'academic_year.required'            => 'Field is required',
            'academic_year.string'              => 'Field must be string',
        ];
    }
}
