import { useState } from 'react';

export const useReduxAction = (funAction) => {
    const [errMess, setErrMess] = useState();
    const [loading, setLoading] = useState(true);

    const action = (data) => {
        setLoading(true);
        return funAction({
            form: data,
            success: () => {
                setLoading(false);
            },
            error: (err) => {
                setLoading(false);
                setErrMess(err.message || err.error);
            },
        });
    };

    return {
        action,
        loading,
        errMess,
    };
};
