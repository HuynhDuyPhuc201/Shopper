import { useSelector } from 'react-redux';

export const useCategoryDetail = (id) => {
    const { categories } = useSelector((store) => store.product);

    if (id) {
        const res = categories?.find((e) => e.id == id);
        return res;
    }
};
