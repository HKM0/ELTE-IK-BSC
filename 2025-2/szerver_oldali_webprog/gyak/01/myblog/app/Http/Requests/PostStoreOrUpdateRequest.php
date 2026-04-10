<?php
/*Form request: artisannal generáljuk az új fájlt (>php artisan make:request) PostStoreOrUpdateRequest: Form Request osztály, amit Laravelben a validálás kiszervezésére használunk. Ez egy új osztály, amely örökli a FormRequest viselkedését. A név („PostStoreOrUpdateRequest”) azt jelzi, hogy ez az űrlap a post létrehozásához vagy frissítéséhez szolgáló adatok validálásához készült. A PostControlletből kivágjuk, és ide tesszük a validálást.
A use Illuminate\Foundation\Http\FormRequest; pedig behúzza a Laravel beépített FormRequest osztályát, amelyből öröklünk — ez adja a validáció teljes logikáját. A Illuminate\Foundation\Http\FormRequest egy Laravel-keretrendszer osztály, tehát nem a te projektedben található, hanem a Laravel framework kódbázisában, amit a Composer töltött le a vendor/ mappába: vendor/laravel/framework/src/Illuminate/Foundation/Http/FormRequest.php
Ez az osztály kiterjeszti a sima Illuminate\Http\Request-et, tehát minden tulajdonságát örökli, de hozzáadja a validációs logikát.
*/

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostStoreOrUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        //Átállítottuk az értéket false-ról true-ra. Ha false maradna, akkor mindne kérés automatikusan elutasításra kerültne.
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    //PostControllerből ide szerveztük ki a validálást rules() és messages() metódusokba.
    //Megjegyzés: az array visszatérési érték mindkét esetben opcionális.
    public function rules(): array
    {
        return [
            //
            'title' => 'required|string',
            'content' => 'required|string|min:10',
            'author_id' => 'required|integer|exists:users,id',
            'categories' => 'array',
            'categories.*' => 'integer|distinct|exists:categories,id'
        ];
    }
    //'A Laravel automatikusan ezeket jeleníti meg a @error('content') stb. direktíváknál, ha a validáció hibát dob.
    public function messages()
    {

        return [
            'content.min' => 'A tartalom legalább 10 karakter kell legyen!'
        ];
    }
}