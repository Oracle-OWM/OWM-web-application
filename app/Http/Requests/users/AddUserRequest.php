<?php

namespace App\Http\Requests\users;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class AddUserRequest extends FormRequest
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
            'first_name'                => [ 'required', 'string' ],
            'last_name'                 => [ 'required', 'string', ],
            'username'                  => [ 'required', 'string', Rule::unique('users', 'username'), ],
            'email'                     => [ 'required', 'email', Rule::unique('users', 'email'),],
            'phone'                     => [ 'required', 'digits:11' ],
            'image'                     => [ 'nullable', ],
        ];
    }


    public function messages()
    {
        return [
            'first_name.required'               => 'Field is required',
            'first_name.string'                 => 'Field must be string',

            'last_name.required'                => 'Field is required',
            'last_name.string'                  => 'Field must be string',

            'email.required'                    => 'Field is required',
            'email.email'                       => 'Field must be an email',
            'email.unique'                      => 'This email is exist',

            'username.required'                 => 'Field is required',
            'username.string'                   => 'Field must be string',
            'username.unique'                   => 'This username is exist',

            'phone.required'                    => 'Field is required',
            'phone.digits'                      => 'Field must be 11 digits',

//            'image.image'                   =>'Choose a correct file according to image extensions',
        ];
    }
}
