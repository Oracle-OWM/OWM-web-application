<?php

namespace App\Http\Requests\users;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserFirebaseTokenRequest extends FormRequest
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
            'user_id'                           => [ 'required', 'exists:users,id' ],
            'firebase_token'                    => [ 'required', 'string'],
        ];
    }


    public function messages()
    {
        return [
            'firebase_token.required'       => 'Field is required',
            'firebase_token.string'         => 'Field must be string',

            'user_id.required'              => 'Field is required',
            'user_id.exists'                => 'This user is not exist',
        ];
    }
}
