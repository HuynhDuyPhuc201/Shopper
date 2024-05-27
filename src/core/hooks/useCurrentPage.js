import { useSearchParams } from 'react-router-dom';

export const useCurrentPage = () => {
    const [searchParams] = useSearchParams();
    return parseInt(searchParams.get('page') || '1');
};
