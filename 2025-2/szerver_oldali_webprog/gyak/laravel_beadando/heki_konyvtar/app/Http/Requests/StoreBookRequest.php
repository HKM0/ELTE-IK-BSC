<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
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
    public function authorize(): bool
    {
        // admin check policy-hoz
        return $this->user()->membership?->name === 'Adminisztrátor';
    }

    /*
    public function messages(): array
    {
        return [
            'title.required' => 'A cím megadása kötelező!',
            'writer.required' => 'A szerző megadása kötelező!',
            'type.required' => 'Kérlek, válassz egy dokumentum típust!',
            'year.required' => 'A kiadás évének megadása kötelező!',
            'year.max' => 'A kiadás éve nem lehet nagyobb a jelenlegi évnél!',
            'language.required' => 'A nyelv kiválasztása kötelező!',
            'isbn.required' => 'Az ISBN szám megadása kötelező!',
            'cover_image.image' => 'A feltöltött fájl csak kép (jpg, png, bmp, gif, svg, vagy webp) lehet!',
            'cover_image.max' => 'A borítókép mérete nem haladhatja meg az 1 MB-ot!',
        ];
    }
    */

    // isbn jav, innen van: https://laravel.com/docs/12.x/validation#preparing-input-for-validation
    protected function prepareForValidation()
    {
        if ($this->has('isbn')) {
            $this->merge([
                'isbn' => str_replace('-', '', $this->isbn)
            ]);
        }
    }
}
