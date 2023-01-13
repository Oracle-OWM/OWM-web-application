<?php

namespace App\Http\Requests\IoT_devices;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class AddIoTDeviceRequest extends FormRequest
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
            'name'                              => [ 'required', 'string', Rule::unique('io_t_devices', 'name')],
        ];
    }


    public function messages()
    {
        return [
            'name.required'                 => 'Field is required',
            'name.string'                   => 'Field must be string',
            'name.unique'                   => 'Field must be unique',
        ];
    }
}
