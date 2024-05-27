import { useSearchParams } from 'react-router-dom';

export const useCurrentPage = () => {
    const [searchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search');
    return {
        currentPage,
        searchParams,
        search,
    };
};
