import { useEffect, useState } from 'react';
import ViewcartItem from '../components/ViewcartItem';
import { useAsync } from '../core/hooks/useAsync';
import { cartService } from '../services/cart.service';
import { currency } from '../utils/currency';
import { useDispatch } from 'react-redux';
import { getCartAction, preCheckoutAction } from '../store/cartReducer';
import Button from './../components/Button';
import { Link, Navigate } from 'react-router-dom';
import { path } from '../config/path';
import { useCart } from '../hooks/useCart';
import { useCheckout } from '~/hooks/useCheckout';

function ViewCart() {
    const { cart } = useCart();
    const [promotion, setPromotion] = useState('');
    const [valuePromotion, setValuePromotion] = useState();
    const dispatch = useDispatch();

    const { excute: getPromotion, error: errPromotion, loading } = useAsync(cartService.getPromotion);
    const { excute: preCheckout } = useAsync(cartService.preCheckout);

    const { tax, promotionCode, total } = useCheckout(cart?.subTotal, valuePromotion);

    const _id = cart?.listItems?.map((item) => {
        return item.product.id;
    });

    const onAddPromotion = async (e) => {
        e.preventDefault();
        if (promotion.trim()) {
            const res = await getPromotion(promotion);
            setValuePromotion(res.data.value || 0);
            localStorage.setItem('promotionCode', promotionCode);
        }
    };

    // useEffect(() => {
    //     if (promotionCode) {
    //         setValuePromotion(promotionCode);
    //     } else {
    //         setValuePromotion('');
    //     }
    // }, [promotionCode]);

    const onPreCheckout = async () => {
        const res = await preCheckout({
            listItems: _id,
            promotionCode: [promotion],
        });
        dispatch(preCheckoutAction(res.data));
    };

    if (cart?.totalQuantity === 0) return <Navigate to={path.Shop} />;

    return (
        <section className="pt-7 pb-12">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Heading */}
                        <h3 className="mb-10 text-center">Shopping Cart</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-7">
                        {/* List group */}
                        <ul className="list-group list-group-lg list-group-flush-x mb-6">
                            {cart?.listItems?.map((e) => (
                                <ViewcartItem key={e.product.id} {...e} />
                            ))}
                        </ul>
                        {/* Footer */}
                        <div className="row align-items-end justify-content-between mb-10 mb-md-0">
                            <div className="col-12 col-md-7">
                                {/* Coupon */}
                                <form className="mb-7 mb-md-0" onSubmit={onAddPromotion}>
                                    <label className="font-size-sm font-weight-bold" htmlFor="cartCouponCode">
                                        Coupon code:
                                    </label>
                                    {errPromotion && <p style={{ color: 'red' }}>{errPromotion}</p>}
                                    <div className="row form-row">
                                        <div className="col">
                                            {/* Input */}
                                            <input
                                                value={promotion}
                                                onChange={(e) => setPromotion(e.target.value)}
                                                className="form-control form-control-sm"
                                                id="cartCouponCode"
                                                type="text"
                                                placeholder="SALE50, SALE25,..."
                                            />
                                        </div>
                                        <div className="col-auto">
                                            {/* Button */}
                                            <Button loading={loading} className="btn btn-sm btn-dark" type="submit">
                                                Apply
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
                        {/* Total */}
                        <div className="card mb-7 bg-light">
                            <div className="card-body">
                                <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                                    <li className="list-group-item d-flex">
                                        <span>Subtotal</span>
                                        <span className="ml-auto font-size-sm">{currency(cart?.subTotal)} vnđ</span>
                                    </li>
                                    <li className="list-group-item d-flex">
                                        <span>Tax</span>
                                        <span className="ml-auto font-size-sm">{currency(tax)} vnđ</span>
                                    </li>
                                    {!errPromotion && valuePromotion && (
                                        <li className="list-group-item d-flex">
                                            <span>Promotion</span>
                                            <span className="ml-auto font-size-sm">{currency(promotionCode)} vnđ</span>
                                        </li>
                                    )}
                                    <li className="list-group-item d-flex font-size-lg font-weight-bold">
                                        <span>Total</span>
                                        <span className="ml-auto font-size-sm">{currency(total)} vnđ</span>
                                    </li>
                                    <li className="list-group-item font-size-sm text-center text-gray-500">
                                        Shipping cost calculated at Checkout *
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* Button */}
                        <Link
                            className="btn btn-block btn-dark mb-2"
                            href="checkout.html"
                            to={path.Checkout}
                            onClick={onPreCheckout}
                        >
                            Proceed to Checkout
                        </Link>
                        {/* Link */}
                        <a className="btn btn-link btn-sm px-0 text-body" href={path.Shop}>
                            <i className="fe fe-arrow-left mr-2" /> Continue Shopping
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ViewCart;
