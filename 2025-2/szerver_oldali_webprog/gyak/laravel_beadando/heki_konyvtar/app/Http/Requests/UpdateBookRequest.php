<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // a controller-ben a Gate::authorize miatt ide true-t raktam
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'writer' => ['required', 'string', 'max:255'],
            'type' => ['required', 'in:könyv,folyóirat,kotta,térkép,képregény'],
            'year' => ['required', 'integer', 'max:2026'],
            'language' => ['required', 'in:hu,en,de,fr,it,ru,es,la,pl'],
            'isbn' => ['required', 'regex:/^(?=(?:\D*\d){13}\D*$)(?:\d-?){13}$/'],
            'cover_image' => ['nullable', 'image', 'mimetypes:image/jpeg,image/png,image/bmp,image/webp', 'max:1024'],
        ];
    }

    // ezzel javitottam, hogy nem kezeltem az elejen a kotojeles isbn-t...
    // innen: https://laravel.com/docs/12.x/validation#preparing-input-for-validation
    protected function prepareForValidation()
    {
        if ($this->has('isbn')) {
            $this->merge([
                'isbn' => str_replace('-', '', $this->isbn)
            ]);
        }
    }
}
