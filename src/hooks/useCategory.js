import { useDispatch, useSelector } from 'react-redux';
import { useReduxAction } from '../core/hooks/useReduxAction';
import { getCategoryAction } from '../store/productReducer';
import { useEffect } from 'react';

export const useCategory = () => {
    const { categories } = useSelector((store) => store.product);
    const dispatch = useDispatch();
    const { loading } = useReduxAction(getCategoryAction);

    useEffect(() => {
        // bị render 2 lần (bug)
        if (categories === null) {
            dispatch(getCategoryAction());
        }
    }, []);

    return { categories, loading };
};
