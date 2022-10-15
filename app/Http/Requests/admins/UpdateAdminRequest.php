<?php

namespace App\Http\Requests\admins;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAdminRequest extends FormRequest
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
            'first_name' => [ 'required', 'string' ],
            'last_name' => [ 'required', 'string' ],
            'username' => "required|string|unique:admins,username,$this->id",
            'email' => [ 'required', 'email', Rule::unique('admins', 'email')->ignore($this->id, 'id'), ],
            'image' => [ 'nullable', ],
        ];
    }

    public function messages()
    {
        return [
            'email.required'=> 'Field is required',
            'email.email'=> 'Field must be an email',
            'email.unique'=> 'This email is exist',

            'first_name.required'=> 'Field is required',
            'first_name.string'=> 'Field must be string',

            'last_name.required'=> 'Field is required',
            'last_name.string'=> 'Field must be string',

            'username.required'=> 'Field is required',
            'username.string'=> 'Field must be string',
            'username.unique'=> 'This username is exist',

        ];
    }
}
