import React from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { path } from '~/config/path';
import { useQuery } from '~/core';
import { orderService } from '~/services/order.service';
import { currency } from '~/utils/currency';

function MyOrderDetail() {
    // lấy id từ link
    const { id } = useParams();

    const { data, error } = useQuery(() => orderService.getOrderDetail(id));

    if (error) return <Navigate to={path.Account.MyOrder} />;
    return (
        <>
            {/* Order */}
            <div className="card card-lg mb-5 border">
                <div className="card-body pb-0">
                    {/* Info */}
                    <div className="card card-sm">
                        <div className="card-body bg-light">
                            <div className="row">
                                <div className="col-6 col-lg-3">
                                    {/* Heading */}
                                    <h6 className="heading-xxxs text-muted">Order No:</h6>
                                    {/* Text */}
                                    <p className="mb-lg-0 font-size-sm font-weight-bold">{data._id}</p>
                                </div>
                                <div className="col-6 col-lg-3">
                                    {/* Heading */}
                                    <h6 className="heading-xxxs text-muted">Order Date:</h6>
                                    {/* Text */}
                                    <p className="mb-lg-0 font-size-sm font-weight-bold">
                                        <time dateTime="2019-10-01">01 Oct, 2019</time>
                                    </p>
                                </div>
                                <div className="col-6 col-lg-3">
                                    {/* Heading */}
                                    <h6 className="heading-xxxs text-muted">Status:</h6>
                                    {/* Text */}
                                    <p className="mb-0 font-size-sm font-weight-bold">Delivered</p>
                                </div>
                                <div className="col-6 col-lg-3">
                                    {/* Heading */}
                                    <h6 className="heading-xxxs text-muted">Order Amount:</h6>
                                    {/* Text */}
                                    <p className="mb-0 font-size-sm font-weight-bold">{currency(data.total)} vnđ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    {/* Heading */}
                    <h6 className="mb-7">Order Items ({data.totalQuantity})</h6>
                    {/* Divider */}
                    <hr className="my-5" />
                    {/* List group */}
                    <ul className="list-group list-group-lg list-group-flush-y list-group-flush-x">
                        {data.listItems?.map((item) => (
                            <li className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-4 col-md-3 col-xl-2">
                                        {/* Image */}
                                        <Link to={`/product-detail/${item.product.slug}/${item.product.id}`}>
                                            <img src={item.product.thumbnail_url} alt="..." className="img-fluid" />
                                        </Link>
                                    </div>
                                    <div className="col">
                                        {/* Title */}
                                        <p className="mb-4 font-size-sm font-weight-bold">
                                            <Link
                                                className="text-body"
                                                to={`/product-detail/${item.product.slug}/${item.product.id}`}
                                            >
                                                {item.product.name}
                                            </Link>
                                            <br />
                                            <span className="text-muted">{currency(item.price)}</span>
                                        </p>
                                        {/* Text */}
                                        <div className="font-size-sm text-muted">
                                            Size: M <br />
                                            Color: Red <br />
                                            Quantity: {item.quantity}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Total */}
            <div className="card card-lg mb-5 border">
                <div className="card-body">
                    {/* Heading */}
                    <h6 className="mb-7">Order Total</h6>
                    {/* List group */}
                    <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                        <li className="list-group-item d-flex">
                            <span>Subtotal</span>
                            <span className="ml-auto">{currency(data?.subTotal || 0)} vnđ</span>
                        </li>
                        <li className="list-group-item d-flex">
                            <span>Tax</span>
                            <span className="ml-auto">{currency(data?.tax || 0)} vnđ</span>
                        </li>
                        <li className="list-group-item d-flex">
                            <span>Shipping</span>
                            <span className="ml-auto">{currency(0)} vnđ</span>
                        </li>
                        <li className="list-group-item d-flex font-size-lg font-weight-bold">
                            <span>Total</span>
                            <span className="ml-auto">{currency(data?.total || 0)} vnđ</span>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Details */}
            <div className="card card-lg border">
                <div className="card-body">
                    {/* Heading */}
                    <h6 className="mb-7">Billing &amp; Shipping Details</h6>
                    {/* Content */}
                    <div className="row">
                        <div className="col-12 col-md-4">
                            {/* Heading */}
                            <p className="mb-4 font-weight-bold">Billing Address:</p>
                            <p className="mb-7 mb-md-0 text-gray-500">
                                {data?.shipping?.fullName}, <br />
                                {data?.shipping?.phone}, <br />
                                {data?.shipping?.province} <br />
                                {data?.shipping?.district}, <br />
                                {data?.shipping?.address}
                            </p>
                        </div>
                        <div className="col-12 col-md-4">
                            {/* Heading */}
                            <p className="mb-4 font-weight-bold">Shipping Address:</p>
                            <p className="mb-7 mb-md-0 text-gray-500">
                                {data?.shipping?.fullName}, <br />
                                {data?.shipping?.phone}, <br />
                                {data?.shipping?.province} <br />
                                {data?.shipping?.district}, <br />
                                {data?.shipping?.address}
                            </p>
                        </div>
                        <div className="col-12 col-md-4">
                            {/* Heading */}
                            <p className="mb-4 font-weight-bold">Shipping Method:</p>
                            <p className="mb-7 text-gray-500">
                                Standart Shipping <br />
                                (5 - 7 days)
                            </p>
                            {/* Heading */}
                            <p className="mb-4 font-weight-bold">Payment Method:</p>
                            <p className="mb-0 text-gray-500">Debit Mastercard</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyOrderDetail;
