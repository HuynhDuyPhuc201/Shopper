import { useEffect, useRef, useState } from 'react';

export const useDebounce = (initialValue, delay = 500) => {
    const [debounceValue, setDebounceValue] = useState(initialValue);

    useEffect(() => {
        const timout = setTimeout(() => {
            setDebounceValue(initialValue);
        }, delay);

        return () => clearTimeout(timout);
    }, [initialValue]);

    return { debounceValue };
};

// cách 2:

export const useDebounce1 = (initialValue, delay = 500) => {
    const timingRef = useRef();
    const [value, _setValue] = useState(initialValue);

    const setValue = (value) => {
        if (timingRef.current) {
            clearTimeout(timingRef.current);
        }

        timingRef.current = setTimeout(() => {
            _setValue(value);
            timingRef.current = null;
        }, delay);
    };

    return [value, setValue];
};
