import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleCartDrawerAction, toggleSearchDrawerAction } from '../store/pageReducer';
import { Link } from 'react-router-dom';
import { path } from './../config/path';
import { useTranslate } from '../core/Components/TranslateProvider';
import Select from './Select';
import { useCart } from '../hooks/useCart';
import { cn } from '~/core';

function Header() {
    const dispatch = useDispatch();
    const { t, selectLocale, locale } = useTranslate();
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const { cart } = useCart();

    const onOpenSearchModal = (e) => {
        e.preventDefault();
        dispatch(toggleSearchDrawerAction());
    };

    const onOpenCartModal = (e) => {
        e.preventDefault();
        dispatch(toggleCartDrawerAction());
    };

    const onToggleMenu = () => {
        setShow(!show);
    };

    return (
        <div>
            {/* NAVBAR */}
            <div className="navbar navbar-topbar navbar-expand-xl navbar-light bg-light">
                <div className="container">
                    {/* Promo */}
                    <div className="mr-xl-8">
                        <i className="fe fe-truck mr-2" />{' '}
                        <span className="heading-xxxs">{t('Free shipping worldwide')}</span>
                    </div>
                    {/* Toggler */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#topbarCollapse"
                        aria-controls="topbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={() => setShow1(!show1)}
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    {/* Collapse */}
                    <div className={'collapse navbar-collapse' + (show1 ? ' show' : '')} id="topbarCollapse">
                        {/* Nav */}
                        <ul className="nav nav-divided navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                {/* Toggle */}
                                <Select
                                    defaultValue={locale}
                                    options={[
                                        { value: 'en', label: 'English' },
                                        { value: 'vi', label: 'Tiếng Việt' },
                                    ]}
                                    onChange={(value) => selectLocale(value)}
                                />
                            </li>
                        </ul>
                        {/* Nav */}
                        <ul className="nav navbar-nav mr-8">
                            <li className="nav-item">
                                <a className="nav-link" href="#!">
                                    {t('Shipping')}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#!">
                                    {t('FAQ')}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#!">
                                    {t('Contact')}
                                </a>
                            </li>
                        </ul>
                        {/* Nav */}
                        <ul className="nav navbar-nav flex-row">
                            <li className="nav-item">
                                <a className="nav-link text-gray-350" href="#!">
                                    <i className="fab fa-facebook-f" />
                                </a>
                            </li>
                            <li className="nav-item ml-xl-n4">
                                <a className="nav-link text-gray-350" href="#!">
                                    <i className="fab fa-twitter" />
                                </a>
                            </li>
                            <li className="nav-item ml-xl-n4">
                                <a className="nav-link text-gray-350" href="#!">
                                    <i className="fab fa-instagram" />
                                </a>
                            </li>
                            <li className="nav-item ml-xl-n4">
                                <a className="nav-link text-gray-350" href="#!">
                                    <i className="fab fa-medium" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
                <div className="container">
                    {/* Brand */}
                    <a className="navbar-brand" href="/">
                        Shopper.
                    </a>
                    {/* Toggler */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={() => setShow(!show)}
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    {/* Collapse */}
                    <div className={'collapse navbar-collapse' + (show ? ' show' : '')} id="navbarCollapse">
                        {/* Nav */}
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item dropdown">
                                {/* Toggle */}
                                <Link className="nav-link" data-toggle="dropdown" to={'/'}>
                                    {t('Home')}
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                {/* Toggle */}
                                <Link className="nav-link" data-toggle="dropdown" to={path.Shop}>
                                    {t('Shop')}
                                </Link>
                                {/* Menu */}
                                <div className="dropdown-menu" style={{ minWidth: '650px' }}>
                                    <div className="card card-lg">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    {/* Heading */}
                                                    <div className="mb-5 font-weight-bold">Shop</div>
                                                    {/* Links */}
                                                    <ul className="list-styled mb-7 font-size-sm">
                                                        <li className="list-styled-item">
                                                            <a className="list-styled-link" href="./shop.html">
                                                                Default
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a className="list-styled-link" href="./shop-topbar.html">
                                                                Topbar
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a className="list-styled-link" href="./shop-collapse.html">
                                                                Collapse
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a className="list-styled-link" href="./shop-simple.html">
                                                                Simple
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a className="list-styled-link" href="./shop-masonry.html">
                                                                Masonry
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    {/* Heading */}
                                                    <div className="mb-5 font-weight-bold">Product</div>
                                                    {/* Links */}
                                                    <ul className="list-styled font-size-sm">
                                                        <li className="list-styled-item">
                                                            <a className="list-styled-link" href="./product.html">
                                                                Default
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                href="./product-images-left.html"
                                                            >
                                                                Images Left
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                href="./product-image-grid.html"
                                                            >
                                                                Image Grid
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                href="./product-image-slider.html"
                                                            >
                                                                Image Slider
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                href="./product-images-stacked.html"
                                                            >
                                                                Images Stacked
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col">
                                                    {/* Heading */}
                                                    <div className="mb-5 font-weight-bold">Support</div>
                                                    {/* Links */}
                                                    <ul className="list-styled mb-7 font-size-sm">
                                                        <li className="list-styled-item">
                                                            <a className="list-styled-link" href="./shopping-cart.html">
                                                                Shopping Cart
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a className="list-styled-link" href="./checkout.html">
                                                                Checkout
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                href="./order-completed.html"
                                                            >
                                                                Order Completed
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                href="./shipping-and-returns.html"
                                                            >
                                                                Shipping &amp; Returns
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    {/* Heading */}
                                                    <div className="mb-5 font-weight-bold">Account</div>
                                                    {/* Links */}
                                                    <ul className="list-styled font-size-sm">
                                                        <li className="list-styled-item">
                                                            <a className="list-styled-link" href="./account-order.html">
                                                                Order
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                href="./account-orders.html"
                                                            >
                                                                Orders
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                href="./account-wishlist.html"
                                                            >
                                                                Wishlist
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                href="./account-personal-info.html"
                                                            >
                                                                Personal Info
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                href="./account-address.html"
                                                            >
                                                                Addresses
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                href="./account-address-edit.html"
                                                            >
                                                                Addresses: New
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col">
                                                    {/* Links */}
                                                    <ul className="list-styled mb-7 font-size-sm">
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                href="./account-payment.html"
                                                            >
                                                                Payment
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                href="./account-payment-edit.html"
                                                            >
                                                                Payment: New
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                href="./account-payment-choose.html"
                                                            >
                                                                Payment: Choose
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a className="list-styled-link" href="./auth.html">
                                                                Auth
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    {/* Heading */}
                                                    <div className="mb-5 font-weight-bold">Modals</div>
                                                    {/* Links */}
                                                    <ul className="list-styled font-size-sm">
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                data-toggle="modal"
                                                                href="#modalNewsletterHorizontal"
                                                            >
                                                                Newsletter: Horizontal
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                data-toggle="modal"
                                                                href="#modalNewsletterVertical"
                                                            >
                                                                Newsletter: Vertical
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                data-toggle="modal"
                                                                href="#modalProduct"
                                                            >
                                                                Product
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a className="list-styled-link" data-toggle="modal">
                                                                Search
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                data-toggle="modal"
                                                                href="#modalShoppingCart"
                                                            >
                                                                Shopping Cart
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                data-toggle="modal"
                                                                href="#modalSizeChart"
                                                            >
                                                                Size Chart
                                                            </a>
                                                        </li>
                                                        <li className="list-styled-item">
                                                            <a
                                                                className="list-styled-link"
                                                                data-toggle="modal"
                                                                href="#modalWaitList"
                                                            >
                                                                Wait List
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="docs/getting-started.html">
                                    {t('Docs')}
                                </a>
                            </li>
                        </ul>
                        {/* Nav */}
                        <ul className="navbar-nav flex-row">
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    data-toggle="modal"
                                    href="#modalSearch"
                                    onClick={onOpenSearchModal}
                                >
                                    <i className="fe fe-search" />
                                </a>
                            </li>
                            <li className="nav-item ml-lg-n4">
                                <Link className="nav-link" to={path.Account.Profile}>
                                    <i className="fe fe-user" />
                                </Link>
                            </li>
                            <li className="nav-item ml-lg-n4">
                                <Link className="nav-link" to={path.Account.Wishlist}>
                                    <i className="fe fe-heart" />
                                </Link>
                            </li>
                            <li className="nav-item ml-lg-n4">
                                <a
                                    className="nav-link"
                                    data-toggle="modal"
                                    href="#modalShoppingCart"
                                    onClick={onOpenCartModal}
                                >
                                    <span data-cart-items={cart?.totalQuantity}>
                                        <i className="fe fe-shopping-cart" />
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* PROMO */}
            <div className="py-3 bg-dark bg-pattern @@classList">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Text */}
                            <div className="text-center text-white">
                                <span className="heading-xxs letter-spacing-xl">
                                    ⚡️ Happy Holiday Deals on Everything ⚡️
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
