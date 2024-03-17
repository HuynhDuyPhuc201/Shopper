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
import { message } from 'antd';
import { useCheckout } from '~/hooks/useCheckout';
import { useTranslate } from '~/core/Components/TranslateProvider';

function Checkout() {
    let { data: address } = useQuery(() => userService.getAddress(), []);
    const [shippingDelivery, setShippingDelivery] = useState('');
    const navigate = useNavigate();

    const { excute: checkout, loading } = useAsync(cartService.checkout);
    const { t } = useTranslate();

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
                        <h3 className="mb-4">{t('Checkout')}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-7">
                        {/* Form */}
                        <form>
                            {/* Heading */}
                            <h6 className="mb-7">{t('Payment address')}</h6>
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
                            <h6 className="mb-7">{t('Shipping Details')}</h6>
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
                                        <span>{t('Subtotal')}</span>
                                        <span className="ml-auto font-size-sm">
                                            {currency(cart?.subTotal || 0)} vnđ
                                        </span>
                                    </li>
                                    <li className="list-group-item d-flex">
                                        <span>{t('Tax')}</span>
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
                                        <span>{t('Shipping')}</span>
                                        <span className="ml-auto font-size-sm">
                                            {currency(cart?.shipping || 0)} vnđ
                                        </span>
                                    </li>
                                    <li className="list-group-item d-flex font-size-lg font-weight-bold">
                                        <span>{t('Total')}</span>
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
                            {t('Place Order')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Checkout;
