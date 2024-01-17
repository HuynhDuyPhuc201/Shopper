import { useLocation } from 'react-router-dom';

export const useURLSearchParams = () => {
    const { search } = useLocation();
    return new URLSearchParams(search);
};
