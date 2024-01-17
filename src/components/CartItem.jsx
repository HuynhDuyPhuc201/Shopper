import { useDispatch } from 'react-redux';
import { currency } from '../utils/currency';
import { removeCartAction, updateQuantityAction } from '../store/cartReducer';
import InputQuantity from './InputQuantity';
import { useState } from 'react';
import { path } from '../config/path';
import { Link, generatePath } from 'react-router-dom';
import { toggleCartDrawerAction } from '../store/pageReducer';

function CartItem({ product, quantity, allowAction }) {
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

    const pathURL = generatePath(path.ProductDetail, { slug: product.slug, id: product.id });
    if (quantity === 0) dispatch(removeCartAction(product.id));

    return (
        <li className="list-group-item">
            <div className="row align-items-center">
                <div className="col-4">
                    <a href="./product.html">
                        <img className="img-fluid" src={product.thumbnail_url} alt="..." />
                    </a>
                </div>
                <div className="col-8">
                    <p className="font-size-sm font-weight-bold mb-6">
                        <Link className="text-body" to={pathURL} onClick={() => dispatch(toggleCartDrawerAction())}>
                            {product.name}
                        </Link>
                        <br />
                        <span className="text-muted">{currency(product.real_price)} vnđ</span>
                    </p>
                    {allowAction && (
                        <div className="d-flex align-items-center">
                            <InputQuantity
                                onDecrement={() => updateQuantity(quantity - 1)}
                                onIncrement={() => updateQuantity(quantity + 1)}
                                value={quantity}
                                loading={loading}
                            />
                            <a className="font-size-xs text-gray-400 ml-auto" href="#!" onClick={onRemove}>
                                <i className="fe fe-x" /> Remove
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
}

export default CartItem;
