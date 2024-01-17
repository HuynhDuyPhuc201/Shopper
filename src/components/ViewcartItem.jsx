import { useDispatch } from 'react-redux';
import { removeCartAction, updateQuantityAction } from '../store/cartReducer';
import { currency } from '../utils/currency';
import { useState } from 'react';
import InputQuantity from './InputQuantity';

function ViewcartItem({ product, quantity }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const onRemove = (e) => {
        e.preventDefault();
        dispatch(removeCartAction(product.id));
    };

    const updateQuantity = (quantity) => {
        setLoading(true);
        dispatch(
            updateQuantityAction({
                id: product.id,
                quantity,
                success: () => {
                    setLoading(false);
                },
            }),
        );
    };
    return (
        <li className="list-group-item" key={product.id}>
            <div className="row align-items-center">
                <div className="col-3">
                    {/* Image */}
                    <a href="product.html">
                        <img src={product.thumbnail_url} alt="..." className="img-fluid" />
                    </a>
                </div>
                <div className="col">
                    {/* Title */}
                    <div className="d-flex mb-2 font-weight-bold">
                        <a className="text-body" href="product.html">
                            {product.name}
                        </a>
                        <span className="ml-auto">{currency(product.real_price)}</span>
                    </div>
                    {/* Text */}
                    <p className="mb-7 font-size-sm text-muted">Color: Brown</p>
                    {/*Footer */}
                    <div className="d-flex align-items-center">
                        {/* Select */}
                        <InputQuantity
                            onDecrement={() => updateQuantity(quantity - 1)}
                            onIncrement={() => updateQuantity(quantity + 1)}
                            value={quantity}
                            loading={loading}
                        />
                        {/* Remove */}
                        <a className="font-size-xs text-gray-400 ml-auto" href="#!" onClick={onRemove}>
                            <i className="fe fe-x" /> Remove
                        </a>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default ViewcartItem;
