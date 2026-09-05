import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../store/roomlieApi';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../store/authSlice';
import { showToast } from '../store/toastSlice';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, error }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await login({ email, password }).unwrap();
            dispatch(setCredentials(result));
            dispatch(showToast({ message: 'Sikeres bejelentkezés!', type: 'success' }));
            navigate('/');
        } catch (err) {
            dispatch(showToast({ message: 'Sikertelen bejelentkezés! Ellenőrizd az adataidat.', type: 'error' }));
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-card border border-border rounded-lg shadow-sm mt-10">
            <h2 className="text-2xl font-bold mb-5 text-foreground text-center">Bejelentkezés</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground text-sm">E-mail cím</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="p-2 border border-border rounded bg-background focus:ring-ring outline-none text-foreground" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground text-sm">Jelszó</label>
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="p-2 border border-border rounded bg-background focus:ring-ring outline-none text-foreground" />
                </div>
                {error && <p className="text-destructive text-sm font-medium">Sikertelen bejelentkezés! Ellenőrizd az adataidat.</p>}
                <button type="submit" disabled={isLoading} className="mt-2 p-2 bg-primary text-primary-foreground rounded font-medium hover:opacity-90 disabled:opacity-50 transition-opacity">
                    {isLoading ? 'Bejelentkezés...' : 'Belépés'}
                </button>
            </form>
        </div>
    );
}