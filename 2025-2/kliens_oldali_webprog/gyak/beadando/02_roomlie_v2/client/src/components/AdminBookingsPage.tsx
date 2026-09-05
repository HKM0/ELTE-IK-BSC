import { useState } from 'react';
import { useGetAllBookingsQuery, useUpdateBookingStatusMutation } from '../store/roomlieApi';
import type { Booking } from '../types';
import { useAppDispatch } from '../store/hooks';
import { showToast } from '../store/toastSlice';

export default function AdminBookingsPage() {
    const dispatch = useAppDispatch();
    const { data: bookings = [], isLoading } = useGetAllBookingsQuery();
    const [updateStatus, { isLoading: isUpdating }] = useUpdateBookingStatusMutation();
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const handleAction = async (id: number, status: 'accepted' | 'declined') => {
        try {
            await updateStatus({ id, status }).unwrap();
            dispatch(showToast({ message: `Foglalás ${status === 'accepted' ? 'elfogadva' : 'elutasítva'}!`, type: 'success' }));
            setSelectedBooking(null);
        } catch (err) {
            dispatch(showToast({ message: 'Sikertelen státuszmódosítás!', type: 'error' }));
        }
    };

    if (isLoading) return <div className="text-center text-muted-foreground p-6">Foglalások betöltése...</div>;

    return (
        <div className="flex flex-col md:flex-row gap-6 text-foreground">
            <div className="flex-1 bg-card border border-border rounded-lg p-4 shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Beérkezett foglalások</h2>
                {bookings.length === 0 ? (
                    <p className="text-muted-foreground italic">Nincsenek beérkezett foglalások.</p>
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
                                <span className={`px-2 py-0.5 text-xs font-bold rounded ${b.status === 'accepted' ? 'bg-green-500/20 text-green-400' : b.status === 'declined' ? 'bg-destructive/20 text-destructive' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                    {b.status}
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
                        : 'Műveletek és adatok'}
                </h3>
                {selectedBooking ? (
                    <div className="flex flex-col gap-4 text-sm">
                        <div className="flex flex-col gap-2">
                            <p><strong>Ügyfél neve:</strong> {selectedBooking.name}</p>
                            <p><strong>E-mail:</strong> {selectedBooking.email}</p>
                            <p><strong>Telefon:</strong> {selectedBooking.phone}</p>
                            <p><strong>Létszám:</strong> {selectedBooking.headcount} fő</p>
                            {selectedBooking.notes && <p><strong>Megjegyzés:</strong> {selectedBooking.notes}</p>}
                        </div>

                        {selectedBooking.status === 'pending' && (
                            <div className="flex gap-2 pt-2 border-t border-border">
                                <button
                                    disabled={isUpdating}
                                    onClick={() => handleAction(selectedBooking.id, 'accepted')}
                                    className="flex-1 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
                                >
                                    Elfogadás
                                </button>
                                <button
                                    disabled={isUpdating}
                                    onClick={() => handleAction(selectedBooking.id, 'declined')}
                                    className="flex-1 py-2 bg-destructive text-destructive-foreground rounded font-medium hover:opacity-90 disabled:opacity-50 transition-colors"
                                >
                                    Elutasítás
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-muted-foreground italic">Válassz ki egy foglalást a kezeléshez!</p>
                )}
            </div>
        </div>
    );
}