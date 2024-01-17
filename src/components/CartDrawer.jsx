import { Drawer, message } from 'antd';
import { useDispatch } from 'react-redux';
import { toggleCartDrawerAction } from '../store/pageReducer';
import CartItem from './CartItem';
import { currency } from './../utils/currency';
import { Link } from 'react-router-dom';
import { path } from './../config/path';
import { usePage } from './../hooks/usePage';
import { useCart } from './../hooks/useCart';

function CartDrawer() {
    const { openCartModal } = usePage();
    const dispatch = useDispatch();
    const { cart } = useCart();

    const checkoutPage = (e) => {
        if (cart?.listItems?.length === 0) {
            e.preventDefault();
            message.warning('Hãy thêm sản phẩm vào giỏ hàng trước khi checkout');
        }
        dispatch(toggleCartDrawerAction());
    };

    return (
        <Drawer width={450} open={openCartModal} headerStyle={{ display: 'none' }} bodyStyle={{ padding: 0 }}>
            <div className="modal-dialog modal-dialog-vertical" role="document">
                <div className="modal-content">
                    <button
                        onClick={() => dispatch(toggleCartDrawerAction())}
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <i className="fe fe-x" aria-hidden="true" />
                    </button>
                    <div className="modal-header line-height-fixed font-size-lg">
                        <strong className="mx-auto">Your Cart ({cart?.totalQuantity})</strong>
                    </div>
                    <ul className="list-group list-group-lg list-group-flush">
                        {cart?.listItems?.map((item) => (
                            <CartItem key={item.product.id} {...item} allowAction />
                        ))}
                    </ul>
                    <div className="modal-footer line-height-fixed font-size-sm bg-light mt-auto">
                        <strong>Subtotal</strong> <strong className="ml-auto">{currency(cart?.subTotal)} vnđ</strong>
                    </div>
                    <div className="modal-body">
                        <Link className="btn btn-block btn-dark" to={path.Checkout} onClick={checkoutPage}>
                            Continue to Checkout
                        </Link>
                        <Link
                            className="btn btn-block btn-outline-dark"
                            to={path.ViewCart}
                            onClick={() => dispatch(toggleCartDrawerAction())}
                        >
                            View Cart
                        </Link>
                    </div>
                </div>
                <div className="modal-content d-none">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <i className="fe fe-x" aria-hidden="true" />
                    </button>
                    <div className="modal-header line-height-fixed font-size-lg">
                        <strong className="mx-auto">Your Cart (0)</strong>
                    </div>
                    <div className="modal-body flex-grow-0 my-auto">
                        <h6 className="mb-7 text-center">Your cart is empty 😞</h6>
                        <a className="btn btn-block btn-outline-dark" href="#!">
                            Continue Shopping
                        </a>
                    </div>
                </div>
            </div>
        </Drawer>
    );
}

export default CartDrawer;
