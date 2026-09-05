<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
//use App\Models\Book;

class StoreReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    protected string $authHiszti = 'Nincs jogosultságod az előjegyzéshez.';

    public function authorize(): bool
    {
        $user = $this->user();

        // tag check
        if (!$user->membership) {
            $this->authHiszti = 'Nincs aktív tagságod az előjegyzéshez!';
            return false;
        }

        // foglalt szam
        $currentReservationsCount = $user->books()->wherePivot('is_reserved', true)->count();

        // limit atlep check
        //return $currentReservationsCount < $user->membership->max_reservations;
        if ($currentReservationsCount >= $user->membership->max_reservations) {
            $this->authHiszti = 'Elérted a maximális előjegyzési limitet!';
            return false;
        }

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
            //
        ];
    }

    /*
    public function messages(): array
    {
        return [
            // ha uthorize() false
            'authorization' => 'Elérted a maximális előjegyzési limitet!'
        ];
    }
    */

    protected function failedAuthorization()
    {
        // igy nem ragad az exception oldalon es minden elerheto a fooldalrol
        throw new HttpResponseException(
            redirect()->back()->with('error', $this->authHiszti)
        );
    }
}
