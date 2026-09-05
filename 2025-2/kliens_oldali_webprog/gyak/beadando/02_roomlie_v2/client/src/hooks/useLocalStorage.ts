import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    // allapot init
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    // ertek valtozas mentes
    const saveToLocalStorage = () => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
            alert('mentés sikerült yipeee!');
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setStoredValue, saveToLocalStorage] as const;
}