import { useState } from 'react';
import { useGetMyBookingsQuery } from '../store/roomlieApi';
import type { Booking } from '../types';

export default function MyBookingsPage() {
    const { data: bookings = [], isLoading } = useGetMyBookingsQuery();
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const getStatusColor = (status: string) => {
        if (status === 'accepted') return 'bg-green-500/20 text-green-400 border-green-500/30';
        if (status === 'declined') return 'bg-destructive/20 text-destructive border-destructive/30';
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    };

    if (isLoading) return <div className="text-center text-muted-foreground p-6">Foglalások betöltése...</div>;

    return (
        <div className="flex flex-col md:flex-row gap-6 text-foreground">
            <div className="flex-1 bg-card border border-border rounded-lg p-4 shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Foglalásaim</h2>
                {bookings.length === 0 ? (
                    <p className="text-muted-foreground italic">Még nem adtál le foglalást.</p>
                ) : (
                    <div className="flex flex-col gap-2">
                        {bookings.map((b) => (
                            <div
                                key={b.id}
                                onClick={() => setSelectedBooking(b)}
                                className={`p-3 border rounded-md cursor-pointer transition-colors flex justify-between items-center bg-background/50 hover:bg-muted ${selectedBooking?.id === b.id ? 'border-primary' : 'border-border'}`}
                            >
                                <div>
                                    <div className="font-semibold">{b.tableName}</div>
                                    <div className="text-xs text-muted-foreground">{b.date} • {b.timeslot}</div>
                                </div>
                                <span className={`px-2 py-0.5 text-xs font-bold border rounded ${getStatusColor(b.status)}`}>
                                    {b.status.toUpperCase()}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex-1 bg-card border border-border rounded-lg p-4 shadow-sm h-fit">
                <h3 className="text-xl font-bold mb-4">
                    {selectedBooking
                        ? `${selectedBooking.tableName ?? selectedBooking.table?.name ?? `Asztal #${selectedBooking.tableId}`} - ${selectedBooking.date} - ${selectedBooking.timeslot}`
                        : 'Foglalás részletei'}
                </h3>
                {selectedBooking ? (
                    <div className="flex flex-col gap-3 text-sm">
                        <p><strong>Név:</strong> {selectedBooking.name}</p>
                        <p><strong>E-mail:</strong> {selectedBooking.email}</p>
                        <p><strong>Telefon:</strong> {selectedBooking.phone}</p>
                        <p><strong>Létszám:</strong> {selectedBooking.headcount} fő</p>
                        {selectedBooking.notes && <p><strong>Megjegyzés:</strong> {selectedBooking.notes}</p>}
                    </div>
                ) : (
                    <p className="text-muted-foreground italic">Válassz ki egy foglalást a listából!</p>
                )}
            </div>
        </div>
    );
}