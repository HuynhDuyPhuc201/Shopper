import { useState } from 'react';
import { validate } from '../utils/validate';

export const useForm = (rules, initialValue = {}) => {
    const [form, setForm] = useState(initialValue);
    const [error, setError] = useState({});

    const _validate = () => {
        const errorObj = validate(form, rules);

        // console.log('errorObj', errorObj);

        setError(errorObj);
        return Object.keys(errorObj).length === 0;
    };

    const register = (name) => {
        return {
            defaultValue: form[name],
            onChange: (ev) => {
                form[name] = ev.target.value;
                setForm({ ...form });
            },
            error: error[name],
        };
    };

    return {
        form,
        setForm,
        error,
        setError,
        validate: _validate,
        register,
    };
};
