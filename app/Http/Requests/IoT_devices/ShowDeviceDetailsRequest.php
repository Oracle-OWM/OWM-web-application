<?php

namespace App\Http\Requests\IoT_devices;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class ShowDeviceDetailsRequest extends FormRequest
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
            'device_id'                             => [ 'required', 'exists:io_t_devices,id' ],
            'start_date'                            => [ 'required',  ],
            'end_date'                              => [ 'required',  ],
        ];
    }


    public function messages()
    {
        return [
            'device_id.required'                        => 'Field is required',
            'device_id.string'                          => 'Field must be string',
            'device_id.exists'                          => 'This device deesn\'t exist',

            'start_date.required'                        => 'Field is required',
            'end_date.required'                        => 'Field is required',

        ];
    }
}
