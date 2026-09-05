import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../store/roomlieApi';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../store/authSlice';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, { isLoading, error }] = useRegisterMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await register({ name, email, password }).unwrap();
            dispatch(setCredentials(result));
            navigate('/');
        } catch (err) {
            //hibakezeles rtk query error valtozon keresztul
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-card border border-border rounded-lg shadow-sm mt-10">
            <h2 className="text-2xl font-bold mb-5 text-foreground text-center">Regisztráció</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground text-sm">Teljes név</label>
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} className="p-2 border border-border rounded bg-background focus:ring-ring outline-none text-foreground" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground text-sm">E-mail cím</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="p-2 border border-border rounded bg-background focus:ring-ring outline-none text-foreground" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground text-sm">Jelszó</label>
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="p-2 border border-border rounded bg-background focus:ring-ring outline-none text-foreground" />
                </div>
                {error && <p className="text-destructive text-sm font-medium">Sikertelen regisztráció! Az e-mail cím már foglalt lehet.</p>}
                <button type="submit" disabled={isLoading} className="mt-2 p-2 bg-primary text-primary-foreground rounded font-medium hover:opacity-90 disabled:opacity-50 transition-opacity">
                    {isLoading ? 'Regisztráció...' : 'Fiók létrehozása'}
                </button>
            </form>
        </div>
    );
}