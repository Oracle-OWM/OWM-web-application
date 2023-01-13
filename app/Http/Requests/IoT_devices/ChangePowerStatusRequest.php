<?php

namespace App\Http\Requests\IoT_devices;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class ChangePowerStatusRequest extends FormRequest
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
            'token'                             => [ 'required', 'string', 'exists:io_t_devices,token' ],
            'start_read'                        => [ 'required', 'boolean', ],
        ];
    }


    public function messages()
    {
        return [
            'token.required'                 => 'Field is required',
            'token.string'                   => 'Field must be string',
            'token.exists'                   => 'This device deesn\'t exist',

            'start_read.required'            => 'Field is required',
            'start_read.boolean'             => 'Field must be boolean',
        ];
    }
}
