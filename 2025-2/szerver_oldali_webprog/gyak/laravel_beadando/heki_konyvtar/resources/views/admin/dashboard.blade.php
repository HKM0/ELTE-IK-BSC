<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between items-center">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Irányítópult
            </h2>
            <a href="{{ route('books.index') }}" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700">
                Vissza a főoldalra
            </a>
        </div>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-gray-500 text-sm font-medium">Könyvek száma</h3>
                    <p class="text-3xl font-bold">{{ $bookCount }}</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-gray-500 text-sm font-medium">Kölcsönzések száma</h3>
                    <p class="text-3xl font-bold">{{ $loanCount }}</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-gray-500 text-sm font-medium">Összes bevétel (díjak)</h3>
                    <p class="text-3xl font-bold">{{ number_format($totalFees, 0, ',', ' ') }} Ft</p>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 class="text-lg font-bold mb-4">Regisztrált felhasználók</h3>
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-bottom border-gray-200">
                            <th class="py-2">Név</th>
                            <th class="py-2">Email</th>
                            <th class="py-2">Tagság</th>
                            <th class="py-2">Tagság lejárata</th>
                            <th class="py-2">Műveletek</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($users as $user)
                            <tr class="border-b border-gray-100 hover:bg-gray-50">
                                <td class="py-2">{{ $user->name }}</td>
                                <td class="py-2">{{ $user->email }}</td>
                                <td class="py-2">{{ $user->membership->name ?? 'Nincs tagság' }}</td>
                                <td class="py-2">{{ $user->member_until_date ? $user->member_until_date->format('Y-m-d') : '-' }}</td>
                                <td class="py-2">
                                    <a href="{{ route('profile.edit.user', $user) }}" class="text-blue-600 hover:underline">Szerkesztés</a> | <a href="{{ route('profile.loans', $user) }}">Kölcsönzések</a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>

                <div class="mt-4">
                    {{ $users->links() }}
                </div>
            </div>
        </div>
    </div>
</x-app-layout>