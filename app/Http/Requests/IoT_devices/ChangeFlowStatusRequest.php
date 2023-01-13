<?php

namespace App\Http\Requests\IoT_devices;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class ChangeFlowStatusRequest extends FormRequest
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
            'flow_status'                       => [ 'required', 'string', ],
        ];
    }


    public function messages()
    {
        return [
            'token.required'                 => 'Field is required',
            'token.string'                   => 'Field must be string',
            'token.exists'                   => 'This device deesn\'t exist',

            'flow_status.required'           => 'Field is required',
            'flow_status.string'             => 'Field must be string',
        ];
    }
}
