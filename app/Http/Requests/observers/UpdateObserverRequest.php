<?php

namespace App\Http\Requests\observers;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateObserverRequest extends FormRequest
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
            'user_username'             => [ 'required', 'exists:users,username' ],
            'first_name'                => [ 'required', 'string' ],
            'last_name'                 => [ 'required', 'string', ],
            'username'                  => [ 'required', 'string', Rule::unique('observers', 'username')->ignore($this->id, 'id'), ],
            'email'                     => [ 'required', 'email', Rule::unique('observers', 'email')->ignore($this->id, 'id'), ],
            'country'                   => [ 'required', 'string' ],
            'city_area'                 => [ 'required', 'string' ],
            'street'                    => [ 'required', 'string', ],
            'phone'                     => [ 'required', 'digits:11' ],
            'image'                     => [ 'nullable', ],
        ];
    }


    public function messages()
    {
        return [
            'user_username.required'                  => 'Field is required',
            'user_username.exists'                    => 'This user does\'t exist',

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

            'country.required'                  => 'Field is required',
            'country.string'                    => 'Field must be string',

            'city_area.required'                => 'Field is required',
            'city_area.string'                  => 'Field must be string',

            'street.required'                   => 'Field is required',
            'street.string'                     => 'Field must be string',

//            'image.image'                   =>'Choose a correct file according to image extensions',
        ];
    }
}
