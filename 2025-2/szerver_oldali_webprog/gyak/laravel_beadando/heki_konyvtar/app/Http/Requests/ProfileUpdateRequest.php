<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    public function rules(): array
    {
        $routeUserId = $this->route('user')?->id ?? $this->user()->id;

        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($routeUserId),
            ],
        ];

        // admin check
        if ($this->user()->membership?->name === 'Adminisztrátor') {
            $rules['membership_id'] = ['nullable', 'exists:memberships,id'];
            $rules['member_until_date'] = ['nullable', 'date'];
        }

        return $rules;
    }
}
