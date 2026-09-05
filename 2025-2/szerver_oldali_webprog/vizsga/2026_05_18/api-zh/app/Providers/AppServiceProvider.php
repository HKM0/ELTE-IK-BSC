<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();
        Validator::extend('min_words', function ($attribute, $value, $parameters) {
            $min = (int) ($parameters[0] ?? 0);
            $words = preg_split('/\s+/', trim($value));
            return count($words) >= $min;
        }, 'The :attribute must contain at least :min words.');
    }
}
