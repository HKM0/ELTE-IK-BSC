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
            'categories' => 'array',
            'categories.*' => 'integer|distinct|exists:categories,id',
            //Az image_file mező opcionális (nullable), de ha meg van adva, akkor képnek kell lennie (image), és csak JPEG, PNG vagy GIF formátum engedélyezett (mimetypes). A fájl mérete nem haladhatja meg a 2048 kilobájtot (max:2048). Az image szabály automatikusan ellenőrzi, hogy a fájl kép-e, beleértve az átnevezett kiterjesztést is (pl exe->gif), és a mimetypes szabály biztosítja, hogy csak a megadott formátumok legyenek elfogadva. A max szabály pedig korlátozza a fájl méretét.
            'image_file' => 'nullable|image|mimetypes:image/jpeg,image/png,image/gif|max:2048'
        ];
    }
    //'A Laravel automatikusan ezeket jeleníti meg a @error('content') stb. direktíváknál, ha a validáció hibát dob.
    public function messages()
    {

        return [
            'content.min' => 'A tartalom legalább 10 karakter kell legyen!',
            'image_file.image' => 'Csak képfájl tölthető fel!',
            'image_file.mimetypes' => 'Csak JPG, PNG vagy GIF formátum engedélyezett!'

        ];
    }
}
