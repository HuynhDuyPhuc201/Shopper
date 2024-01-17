import { useEffect, useState } from 'react';

export const useAsync = (promise) => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const [mess, setMess] = useState('');

    // useAsync thường dùng cho service -> click service thì nó sẽ xử lý service đó

    const excute = async (...rest) => {
        try {
            setLoading(true);
            setError('');
            const result = await promise(...rest);
            setMess(result.message);
            return result;
        } catch (error) {
            setError(error.message || error.err);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        excute,
        loading,
        setLoading,
        error,
        setError,
        mess,
    };
};
