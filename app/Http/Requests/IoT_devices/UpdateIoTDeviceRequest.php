<?php

namespace App\Http\Requests\IoT_devices;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class UpdateIoTDeviceRequest extends FormRequest
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
            'name'                              => [ 'string', Rule::unique('io_t_devices', 'name')->ignore($this->id, 'id')],
            'start_read'                        => [ 'boolean', ],
        ];
    }


    public function messages()
    {
        return [
            'start_read.boolean'            => 'Field must be boolean',
            'name.string'                   => 'Field must be string',
            'name.unique'                   => 'Field must be unique',
        ];
    }
}
