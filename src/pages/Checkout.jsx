import { useEffect, useState } from 'react';
import Input from '../components/Input';
import { useAsync, useForm, useQuery } from '../core/hooks';
import CartItem from './../components/CartItem';
import { currency } from '../utils/currency';
import { userService } from '../services/user.service';
import { Navigate, generatePath, useNavigate } from 'react-router-dom';
import { path } from '../config/path';
import { cartService } from '../services/cart.service';
import { useCart } from '../hooks/useCart';
import { getCartAction, preCheckoutAction } from '../store/cartReducer';
import { message } from 'antd';
import { useCheckout } from '~/hooks/useCheckout';

function Checkout() {
    let { data: address } = useQuery(() => userService.getAddress(), []);
    const [shippingDelivery, setShippingDelivery] = useState('');
    const navigate = useNavigate();

    const { excute: checkout, loading } = useAsync(cartService.checkout);

    const { setForm, form, validate, register } = useForm({
        fullName: [{ required: true }],
        phone: [{ required: true }, { regexp: 'phone' }],
        email: [{ required: true }, { regexp: 'email' }],
        district: [{ required: true }],
        province: [{ required: true }],
        address: [{ required: true }],
    });
    const { cart } = useCart();
    const { tax, total } = useCheckout(cart?.subTotal);

    useEffect(() => {
        if (address) {
            // tìm địa chỉ mặc định
            address.filter((item) => {
                if (item['default']) {
                    setForm(item);
                }
            });
        }
    }, [address]);

    const onCheckoutComplete = async (e) => {
        e.preventDefault();
        try {
            if (validate()) {
                const res = await checkout({
                    promotionCode: [cart?.promotion?.code || ''],
                    listItems: cart?.listItems.map((item) => item.productId),
                    shipping: form,
                });

                navigate(generatePath(path.CompleteOrder, { id: res.data._id }));
            }
        } catch (err) {
            message.warning(err.message);
        }
    };

    useEffect(() => {
        if (shippingDelivery === 'giao-hang-nhanh') {
            cart.shipping = 35000;
        } else if (shippingDelivery === 'tieu-chuan') {
            cart.shipping = 14000;
        }
        // dispatch(getCartAction());
    }, [shippingDelivery]);

    if (cart?.totalQuantity === 0) return <Navigate to={path.Shop} />;

    return (
        <section className="pt-7 pb-12">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        {/* Heading */}
                        <h3 className="mb-4">Checkout</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-7">
                        {/* Form */}
                        <form>
                            {/* Heading */}
                            <h6 className="mb-7">Billing Details</h6>
                            {/* Billing details */}
                            <div className="row mb-9">
                                <div className="col-12">
                                    {/* Last Name */}
                                    <Input placeholder="Full Name *" {...register('fullName')} />
                                </div>
                                <div className="col-12 col-md-6">
                                    {/* Email */}
                                    <Input placeholder="Email *" {...register('email')} />
                                </div>
                                <div className="col-12 col-md-6">
                                    {/* Email */}
                                    <Input placeholder="Phone *" {...register('phone')} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <Input placeholder="Province *" {...register('province')} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <Input placeholder="Address *" {...register('address')} />
                                </div>
                            </div>

                            {/* Heading */}
                            <h6 className="mb-7">Shipping Details</h6>
                            {/* Shipping details */}
                            <div className="table-responsive mb-6">
                                <table className="table table-bordered table-sm table-hover mb-0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="custom-control custom-radio">
                                                    <input
                                                        onChange={() => setShippingDelivery('tieu-chuan')}
                                                        className="custom-control-input"
                                                        id="checkoutShippingStandard"
                                                        name="shipping"
                                                        type="radio"
                                                    />

                                                    <label
                                                        className="custom-control-label text-body text-nowrap"
                                                        htmlFor="checkoutShippingStandard"
                                                    >
                                                        Tiêu chuẩn
                                                    </label>
                                                </div>
                                            </td>
                                            <td>Delivery in 5 - 7 working days</td>
                                            <td>{currency(14000)} vnđ</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="custom-control custom-radio">
                                                    <input
                                                        onChange={() => setShippingDelivery('giao-hang-nhanh')}
                                                        className="custom-control-input"
                                                        id="checkoutShippingExpress"
                                                        name="shipping"
                                                        type="radio"
                                                    />
                                                    <label
                                                        className="custom-control-label text-body text-nowrap"
                                                        htmlFor="checkoutShippingExpress"
                                                    >
                                                        Giao hàng nhanh
                                                    </label>
                                                </div>
                                            </td>
                                            <td>Delivery in 3 - 5 working days</td>
                                            <td>{currency(35000)} vnđ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Address */}
                            <div className="mb-9">
                                {/* Checkbox */}
                                <div className="custom-control custom-checkbox">
                                    <input
                                        className="custom-control-input"
                                        id="checkoutShippingAddress"
                                        type="checkbox"
                                    />
                                    <label
                                        className="custom-control-label font-size-sm"
                                        data-toggle="collapse"
                                        data-target="#checkoutShippingAddressCollapse"
                                        htmlFor="checkoutShippingAddress"
                                    >
                                        Ship to a different address?
                                    </label>
                                </div>
                                {/* Collapse */}
                                <div className="collapse" id="checkoutShippingAddressCollapse">
                                    <div className="row mt-6">
                                        <div className="col-12">
                                            {/* Country */}
                                            <div className="form-group">
                                                <label htmlFor="checkoutShippingAddressCountry">Country *</label>
                                                <input
                                                    className="form-control form-control-sm"
                                                    id="checkoutShippingAddressCountry"
                                                    type="text"
                                                    placeholder="Country"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            {/* Address Line 1 */}
                                            <div className="form-group">
                                                <label htmlFor="checkoutShippingAddressLineOne">Address Line 1 *</label>
                                                <input
                                                    className="form-control form-control-sm"
                                                    id="checkoutShippingAddressLineOne"
                                                    type="text"
                                                    placeholder="Address Line 1"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            {/* Address Line 2 */}
                                            <div className="form-group">
                                                <label htmlFor="checkoutShippingAddressLineTwo">Address Line 2</label>
                                                <input
                                                    className="form-control form-control-sm"
                                                    id="checkoutShippingAddressLineTwo"
                                                    type="text"
                                                    placeholder="Address Line 2 (optional)"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            {/* Town / City */}
                                            <div className="form-group">
                                                <label htmlFor="checkoutShippingAddressTown">Town / City *</label>
                                                <input
                                                    className="form-control form-control-sm"
                                                    id="checkoutShippingAddressTown"
                                                    type="text"
                                                    placeholder="Town / City"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            {/* Town / City */}
                                            <div className="form-group">
                                                <label htmlFor="checkoutShippingAddressZIP">ZIP / Postcode *</label>
                                                <input
                                                    className="form-control form-control-sm"
                                                    id="checkoutShippingAddressZIP"
                                                    type="text"
                                                    placeholder="ZIP / Postcode"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            {/* Button */}
                                            <button className="btn btn-sm btn-outline-dark" type="submit">
                                                Save Address
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Heading */}
                            <h6 className="mb-7">Payment</h6>
                            {/* List group */}
                            <div className="list-group list-group-sm mb-7">
                                <div className="list-group-item">
                                    {/* Radio */}
                                    <div className="custom-control custom-radio">
                                        {/* Input */}
                                        <input
                                            className="custom-control-input"
                                            id="checkoutPaymentCard"
                                            name="payment"
                                            type="radio"
                                            data-toggle="collapse"
                                            data-action="show"
                                            data-target="#checkoutPaymentCardCollapse"
                                        />
                                        {/* Label */}
                                        <label
                                            className="custom-control-label font-size-sm text-body text-nowrap"
                                            htmlFor="checkoutPaymentCard"
                                        >
                                            Credit Card{' '}
                                            <img className="ml-2" src="/img/brands/color/cards.svg" alt="..." />
                                        </label>
                                    </div>
                                </div>
                                <div className="list-group-item collapse py-0" id="checkoutPaymentCardCollapse">
                                    {/* Form */}
                                    <div className="form-row py-5">
                                        <div className="col-12">
                                            <div className="form-group mb-4">
                                                <label className="sr-only" htmlFor="checkoutPaymentCardNumber">
                                                    Card Number
                                                </label>
                                                <input
                                                    className="form-control form-control-sm"
                                                    id="checkoutPaymentCardNumber"
                                                    type="text"
                                                    placeholder="Card Number *"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group mb-4">
                                                <label className="sr-only" htmlFor="checkoutPaymentCardName">
                                                    Name on Card
                                                </label>
                                                <input
                                                    className="form-control form-control-sm"
                                                    id="checkoutPaymentCardName"
                                                    type="text"
                                                    placeholder="Name on Card *"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group mb-md-0">
                                                <label className="sr-only" htmlFor="checkoutPaymentMonth">
                                                    Month
                                                </label>
                                                <select
                                                    className="custom-select custom-select-sm"
                                                    id="checkoutPaymentMonth"
                                                >
                                                    <option>January</option>
                                                    <option>February</option>
                                                    <option>March</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group mb-md-0">
                                                <label className="sr-only" htmlFor="checkoutPaymentCardYear">
                                                    Year
                                                </label>
                                                <select
                                                    className="custom-select custom-select-sm"
                                                    id="checkoutPaymentCardYear"
                                                >
                                                    <option>2017</option>
                                                    <option>2018</option>
                                                    <option>2019</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="input-group input-group-merge">
                                                <input
                                                    className="form-control form-control-sm"
                                                    id="checkoutPaymentCardCVV"
                                                    type="text"
                                                    placeholder="CVV *"
                                                    required
                                                />
                                                <div className="input-group-append">
                                                    <span
                                                        className="input-group-text"
                                                        data-toggle="popover"
                                                        data-placement="top"
                                                        data-trigger="hover"
                                                        data-content="The CVV Number on your credit card or debit card is a 3 digit number on VISA, MasterCard and Discover branded credit and debit cards."
                                                    >
                                                        <i className="fe fe-help-circle" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    {/* Radio */}
                                    <div className="custom-control custom-radio">
                                        {/* Input */}
                                        <input
                                            className="custom-control-input"
                                            id="checkoutPaymentPaypal"
                                            name="payment"
                                            type="radio"
                                            data-toggle="collapse"
                                            data-action="hide"
                                            data-target="#checkoutPaymentCardCollapse"
                                        />
                                        {/* Label */}
                                        <label
                                            className="custom-control-label font-size-sm text-body text-nowrap"
                                            htmlFor="checkoutPaymentPaypal"
                                        >
                                            <img src="/img/brands/color/paypal.svg" alt="..." />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/* Notes */}
                            <textarea
                                className="form-control form-control-sm mb-9 mb-md-0 font-size-xs"
                                rows={5}
                                placeholder="Order Notes (optional)"
                                defaultValue={''}
                            />
                        </form>
                    </div>
                    <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
                        {/* Heading */}
                        <h6 className="mb-7">Order Items ({cart?.totalQuantity})</h6>
                        {/* Divider */}
                        <hr className="my-7" />
                        {/* List group */}
                        <ul className="list-group list-group-lg list-group-flush-y list-group-flush-x mb-7">
                            {cart?.listItems?.map((item) => (
                                <CartItem key={item.product.id} {...item} />
                            ))}
                        </ul>
                        {/* Card */}

                        <div className="card mb-9 bg-light">
                            <div className="card-body">
                                <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                                    <li className="list-group-item d-flex">
                                        <span>Subtotal</span>
                                        <span className="ml-auto font-size-sm">
                                            {currency(cart?.subTotal || 0)} vnđ
                                        </span>
                                    </li>
                                    <li className="list-group-item d-flex">
                                        <span>Tax</span>
                                        <span className="ml-auto font-size-sm">{currency(tax || 0)} vnđ</span>
                                    </li>
                                    {cart?.promotion && (
                                        <li className="list-group-item d-flex">
                                            <span>
                                                Promotion <br />
                                                {cart?.promotion?.title && (
                                                    <span style={{ color: 'green' }}> ({cart?.promotion?.title})</span>
                                                )}
                                            </span>
                                            <span className="ml-auto font-size-sm">
                                                {currency(cart?.promotion?.discount || 0)} vnđ
                                            </span>
                                        </li>
                                    )}

                                    <li className="list-group-item d-flex">
                                        <span>Shipping</span>
                                        <span className="ml-auto font-size-sm">
                                            {currency(cart?.shipping || 0)} vnđ
                                        </span>
                                    </li>
                                    <li className="list-group-item d-flex font-size-lg font-weight-bold">
                                        <span>Total</span>
                                        <span className="ml-auto"> {currency(total || 0)} vnđ</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* Disclaimer */}
                        <p className="mb-7 font-size-xs text-gray-500">
                            Your personal data will be used to process your order, support your experience throughout
                            this website, and for other purposes described in our privacy policy.
                        </p>
                        {/* Button */}
                        <button className="btn btn-block btn-dark" onClick={onCheckoutComplete}>
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Checkout;
