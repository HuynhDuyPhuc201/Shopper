import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useCurrentPage } from '~/core/hooks/useCurrentPage';
import { getWishlistAction } from '~/store/productReducer';

export const useProduct = () => {
    const { categories, wishlist } = useSelector((store) => store.product);
    const dispatch = useDispatch();

    // const currentPage = useCurrentPage();

    // const { data, paginate, loading } = useQuery(
    //     () => productService.getwishlist(`?page=${currentPage}`),
    //     [currentPage],
    // );
    const [searchParams] = useSearchParams();

    const currentPage = parseInt(searchParams.get('page') || '1');
    useEffect(() => {
        if (wishlist === null) {
            dispatch(getWishlistAction(currentPage));
        }
    }, [wishlist, currentPage]);

    return {
        categories,
        wishlist,
    };
};
