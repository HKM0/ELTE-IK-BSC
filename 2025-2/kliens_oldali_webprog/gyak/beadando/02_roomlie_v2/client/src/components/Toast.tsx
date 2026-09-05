import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { hideToast, selectToast } from '../store/toastSlice';

export default function Toast() {
    const { message, type } = useAppSelector(selectToast);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => dispatch(hideToast()), 3000);
            return () => clearTimeout(timer);
        }
    }, [message, dispatch]);

    if (!message) return null;

    const bgClass = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-destructive' : 'bg-blue-600';

    return (
        <div className={`fixed bottom-5 right-5 ${bgClass} text-white px-4 py-3 rounded-lg shadow-lg z-50 transition-all animate-bounce`}>
            {message}
        </div>
    );
}