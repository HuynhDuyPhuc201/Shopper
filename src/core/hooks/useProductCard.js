import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCartAction } from '../../store/cartReducer';
import { message } from 'antd';
import { productService } from '../../services/product.service';
import { useNavigate } from 'react-router-dom';
import { path } from './../../config/path';
import { useAsync } from './useAsync';
import { useAuth } from './../../hooks/useAuth';

export const useProductCard = (data) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useAuth();

    const { loading: loadingWishlist, excute: addWishlist } = useAsync(productService.addWishlist);

    const onAddProduct = (e) => {
        setLoading(true);

        if (user) {
            dispatch(
                addCartAction({
                    id: data.id,
                    success: () => {
                        setLoading(false);
                        message.success(`Thêm sản phẩm ${data.name} vào giỏ hàng thành công`);
                    },
                    finally: () => {
                        setLoading(false);
                    },
                }),
            );
        } else {
            navigate(path.Auth);
        }
    };

    const onAddWishlist = async () => {
        try {
            if (user) {
                await addWishlist(data.id);
                message.success(`Thêm sản phẩm ${data.name} yêu thích thành công`);
            } else {
                navigate(path.Auth);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    return {
        onAddProduct,
        onAddWishlist,
        loading,
        loadingWishlist,
    };
};
