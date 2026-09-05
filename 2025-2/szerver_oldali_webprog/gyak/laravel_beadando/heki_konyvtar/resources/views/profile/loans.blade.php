<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ $user->name }} kölcsönzései és előjegyzései
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Aktív kölcsönzések</h3>
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b">
                            <th class="py-2">Szerző és Cím</th>
                            <th class="py-2">Hosszabbítva?</th>
                            <th class="py-2">Kezdő dátum</th>
                            <th class="py-2">Záró dátum</th>
                            <th class="py-2">Díjak</th>
                            <th class="py-2">Hátralévő napok</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($activeLoans as $book)
                            @php
                                $deadline = \Carbon\Carbon::parse($book->pivot->deadline_date)->startOfDay();

                                // felse param-nal negativ szamit kap ha lejart...
                                $daysLeft = now()->startOfDay()->diffInDays($deadline, false); 
                            @endphp
                            <tr class="border-b hover:bg-gray-50">
                                <td class="py-2">{{ $book->writer }}: {{ $book->title }}</td>
                                <td class="py-2">{{ $book->pivot->is_extended ? 'Igen' : 'Nem' }}</td>
                                <td class="py-2">{{ $book->pivot->start_date }}</td>
                                <td class="py-2">{{ $book->pivot->deadline_date }}</td>
                                <td class="py-2">{{ $book->pivot->payed_total_fee }} Ft</td>
                                <td class="py-2 {{ $daysLeft < 0 ? 'text-red-600 font-bold' : '' }}">
                                    {{ $daysLeft }} nap
                                </td>

                                {{--  --}}
                                <td class="py-2">
                                    @if(!$book->pivot->is_extended)
                                        <form action="{{ route('books.extend', [$user, $book]) }}" method="POST">
                                            @csrf
                                            <button type="submit" class="text-blue-600 hover:underline">Hosszabbítás</button>
                                        </form>
                                    @endif
                                </td>
                                {{--  --}}
                            </tr>
                        @empty
                            <tr><td colspan="6" class="py-2 text-gray-500">Nincs aktív kölcsönzés.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Múltbeli kölcsönzések</h3>
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b">
                            <th class="py-2">Szerző és Cím</th>
                            <th class="py-2">Kezdő dátum</th>
                            <th class="py-2">Záró dátum</th>
                            <th class="py-2">Díjak</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($pastLoans as $book)
                            <tr class="border-b hover:bg-gray-50">
                                <td class="py-2">{{ $book->writer }}: {{ $book->title }}</td>
                                <td class="py-2">{{ $book->pivot->start_date }}</td>
                                <td class="py-2">{{ $book->pivot->end_date }}</td>
                                <td class="py-2">{{ $book->pivot->payed_total_fee }} Ft</td>
                            </tr>
                        @empty
                            <tr><td colspan="4" class="py-2 text-gray-500">Nincs múltbeli kölcsönzés.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Előjegyzett könyvek</h3>
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b">
                            <th class="py-2">Szerző és Cím</th>
                            <th class="py-2">Műveletek</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($reservations as $book)
                            <tr class="border-b hover:bg-gray-50">
                                <td class="py-2">{{ $book->writer }}: {{ $book->title }}</td>
                                <td class="py-2">
                                    <form action="{{ route('books.cancel_reservation', $book) }}" method="POST">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="text-red-600 hover:underline">Előjegyzés törlése</button>
                                    </form>
                                </td>
                            </tr>
                        @empty
                            <tr><td colspan="2" class="py-2 text-gray-500">Nincs előjegyzett könyv.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</x-app-layout>