<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'book_id' => ['required', 'integer', 'exists:books,id'],
            'start_date' => ['nullable', 'date', 'before_or_equal:today', 'required_with:deadline_date,end_date'],
            'deadline_date' => ['nullable', 'date', 'after_or_equal:start_date', 'required_with:start_date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'is_extended' => ['boolean'],
            'is_reserved' => ['boolean'],
            'payed_total_fee' => ['integer', 'min:0'],
        ];
    }
}
