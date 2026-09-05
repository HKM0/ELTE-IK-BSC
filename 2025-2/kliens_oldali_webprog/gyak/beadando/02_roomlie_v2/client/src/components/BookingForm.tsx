import { useState } from 'react';
import { useGetTimeslotsQuery, useCreateBookingMutation } from '../store/roomlieApi';
import { showToast } from '../store/toastSlice';
import { useAppDispatch } from '../store/hooks';

export default function BookingForm({ tableId }: { tableId: number }) {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [timeslot, setTimeslot] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', headcount: 1, notes: '' });

    const { data: timeslots = [], isLoading } = useGetTimeslotsQuery({ tableId, date });
    const [createBooking, { isLoading: isSaving }] = useCreateBookingMutation();

    const dispatch = useAppDispatch();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!timeslot) return;
        try {
            await createBooking({ tableId, date, timeslot, ...formData }).unwrap();
            dispatch(showToast({ message: 'Asztal sikeresen lefoglalva!', type: 'success' }));
            setTimeslot('');
        } catch (err) {
            dispatch(showToast({ message: 'Sikertelen foglalás! Az időpont időközben foglalt lett.', type: 'error' }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4 p-4 border border-border rounded bg-card text-foreground">
            <label className="font-semibold text-sm">Dátum kiválasztása:</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="p-2 border rounded bg-background text-foreground" />

            <label className="font-semibold text-sm">Időpont:</label>
            {isLoading ? <p className="text-xs text-muted-foreground">Időpontok betöltése...</p> : (
                <select value={timeslot} onChange={e => setTimeslot(e.target.value)} className="p-2 border rounded bg-background text-foreground" required>
                    <option value="">Válassz időpontot</option>
                    {timeslots.map((t, index) => (
                        <option key={`${t.time}-${index}`} value={t.time} disabled={!t.available}>
                            {t.available ? t.time : `${t.time} - Foglalt`}
                        </option>
                    ))}
                </select>
            )}

            <input placeholder="Név" required value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="p-2 border rounded bg-background text-foreground" />

            <input placeholder="Email" type="email" required value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="p-2 border rounded bg-background text-foreground" />

            <input placeholder="Telefon" required value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="p-2 border rounded bg-background text-foreground" />

            <input placeholder="Résztvevők száma" type="number" min="1" required value={formData.headcount}
                onChange={e => setFormData({ ...formData, headcount: parseInt(e.target.value, 10) })}
                className="p-2 border rounded bg-background text-foreground" />

            <textarea placeholder="Megjegyzés (opcionális)" value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                className="p-2 border rounded bg-background text-foreground" />

            <button type="submit" disabled={isSaving || !timeslot} className="p-2 bg-primary text-primary-foreground rounded font-medium hover:opacity-90 disabled:opacity-50 transition-opacity">
                {isSaving ? 'Mentés...' : 'Asztal lefoglalása'}
            </button>
        </form>
    );
}