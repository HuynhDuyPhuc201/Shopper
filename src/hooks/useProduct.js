import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useReduxAction } from '~/core/hooks/useReduxAction';
import { getCategoryAction } from '~/store/productReducer';

export const useProduct = () => {
    const { categories } = useSelector((store) => store.product);
    const { loading } = useReduxAction(getCategoryAction);
    const dispatch = useDispatch();

    useEffect(() => {
        // hiện tại này đang bị bug render 2 lần
        if (categories === null) dispatch(getCategoryAction());
    }, []);

    return {
        categories,
        loading,
    };
};
