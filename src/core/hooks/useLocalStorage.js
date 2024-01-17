import { useEffect, useState } from 'react';

export const useLocalStorage = (name, value) => {
    const [_value, setValue] = useState(() => {
        return localStorage.getItem(name) || value;
    });

    useEffect(() => {
        localStorage.setItem(name, _value);
    }, [_value]);

    return [_value, setValue];
};
