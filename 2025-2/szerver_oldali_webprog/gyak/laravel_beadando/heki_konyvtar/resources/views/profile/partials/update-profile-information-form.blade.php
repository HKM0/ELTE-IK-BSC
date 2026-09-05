<section>
    <header>
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            {{ __('Profile Information') }}
        </h2>

        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {{ __("Update your account's profile information and email address.") }}
        </p>
    </header>

    <form id="send-verification" method="post" action="{{ route('verification.send') }}">
        @csrf
    </form>

    <form method="post" action="{{ auth()->id() === $user->id ? route('profile.update') : route('profile.update.user', $user) }}" class="mt-6 space-y-6">
        @csrf
        @method('patch')

        <div>
            <x-input-label for="name" :value="__('Name')" />
            <x-text-input id="name" name="name" type="text" class="mt-1 block w-full" :value="old('name', $user->name)" required autofocus autocomplete="name" />
            <x-input-error class="mt-2" :messages="$errors->get('name')" />
        </div>

        <div>
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" name="email" type="email" class="mt-1 block w-full" :value="old('email', $user->email)" required autocomplete="username" />
            <x-input-error class="mt-2" :messages="$errors->get('email')" />

            @if ($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && ! $user->hasVerifiedEmail())
                <div>
                    <p class="text-sm mt-2 text-gray-800 dark:text-gray-200">
                        {{ __('Your email address is unverified.') }}

                        <button form="send-verification" class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                            {{ __('Click here to re-send the verification email.') }}
                        </button>
                    </p>

                    @if (session('status') === 'verification-link-sent')
                        <p class="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                            {{ __('A new verification link has been sent to your email address.') }}
                        </p>
                    @endif
                </div>
            @endif
        </div>

        <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Tagsági adatok</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {{-- admin resz--}}
                @if(auth()->user()->membership?->name === 'Adminisztrátor')
                    <div>
                        <x-input-label for="membership_id" value="Tagsági szint" />
                        <select name="membership_id" id="membership_id" class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">
                            <option value="">Nincs tagság</option>
                            @foreach($memberships as $membership)
                                <option value="{{ $membership->id }}" {{ old('membership_id', $user->membership_id) == $membership->id ? 'selected' : '' }}>
                                    {{ $membership->name }}
                                </option>
                            @endforeach
                        </select>
                        <x-input-error class="mt-2" :messages="$errors->get('membership_id')" />
                    </div>
                
                    <div>
                        <x-input-label for="member_until_date" value="Tagság lejárati ideje" />
                        <x-text-input id="member_until_date" name="member_until_date" type="date" class="mt-1 block w-full" :value="old('member_until_date', $user->member_until_date?->format('Y-m-d'))" />
                        <x-input-error class="mt-2" :messages="$errors->get('member_until_date')" />
                    </div>
                
                {{-- normal user --}}
                @else
                    <div>
                        <x-input-label value="Tagsági szint" />
                        <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                            {{ $user->membership->name ?? 'Nincs tagság' }}
                        </p>
                    </div>
                
                    <div>
                        <x-input-label value="Tagság lejárati ideje" />
                        <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                            {{ $user->member_until_date ? $user->member_until_date->format('Y-m-d') : 'Nincs lejárati dátum' }}
                        </p>
                    </div>
                @endif
            </div>
        </div>

        <div class="flex items-center gap-4">
            <x-primary-button>{{ __('Save') }}</x-primary-button>

            @if (session('status') === 'profile-updated')
                <p
                    x-data="{ show: true }"
                    x-show="show"
                    x-transition
                    x-init="setTimeout(() => show = false, 2000)"
                    class="text-sm text-gray-600 dark:text-gray-400"
                >{{ __('Saved.') }}</p>
            @endif
        </div>
    </form>
</section>
