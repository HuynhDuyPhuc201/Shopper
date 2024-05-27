import { Link, useLocation, useParams } from 'react-router-dom';
import { useAsync, useQuery } from '../core/hooks';
import { productService } from '../services/product.service';
import { currency } from '../utils/currency';
import { useProductCard } from '~/core/hooks/useProductCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import { Tab } from './../components/Tab';
import { useEffect } from 'react';

function ProductDetail() {
    // lấy slug, id... từ url
    const params = useParams();
    const _id = params.id;

    const { data, excute: updateData } = useQuery(() => productService.getProductDetail(_id), []);
    const name = data.name;
    const id = data.id;

    const { pathname } = useLocation();

    useEffect(() => {
        updateData();
    }, [pathname]);

    const { onAddProduct, onAddWishlist, loading } = useProductCard({ name, id });

    const img1 = data.images?.[0]?.small_url;
    const img2 = data.images?.[1]?.small_url;

    const imgLarge1 = data.images?.[0]?.thumbnail_url;
    const imgLarge2 = data.images?.[1]?.thumbnail_url || imgLarge1;
    const imgLarge3 = data.images?.[2]?.thumbnail_url || imgLarge1 || imgLarge2;

    const descriptTab = [
        { id: 0, title: 'Description' },
        { id: 1, title: 'Size & Fit' },
        { id: 2, title: 'Shipping & Return' },
    ];

    return (
        <>
            <nav className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Breadcrumb */}
                            <ol className="breadcrumb mb-0 font-size-xs text-gray-400">
                                <li className="breadcrumb-item">
                                    <Link className="text-gray-400" to="/">
                                        Home
                                    </Link>
                                </li>

                                <li className="breadcrumb-item active">{data?.name}</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </nav>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <Swiper slidesPerView={1}>
                                        <SwiperSlide>
                                            <div className="col-12 px-2" style={{ maxWidth: '100%' }}>
                                                <div
                                                    className="embed-responsive embed-responsive-1by1 bg-cover"
                                                    style={{ backgroundImage: `url(${imgLarge1})` }}
                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="col-12 px-2" style={{ maxWidth: '100%' }}>
                                                <div
                                                    className="embed-responsive embed-responsive-1by1 bg-cover"
                                                    style={{ backgroundImage: `url(${imgLarge2})` }}
                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="col-12 px-2" style={{ maxWidth: '100%' }}>
                                                <div
                                                    className="embed-responsive embed-responsive-1by1 bg-cover"
                                                    style={{ backgroundImage: `url(${imgLarge3})` }}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                                <div className="col-12 col-md-6 pl-lg-10">
                                    {/* Header */}
                                    <div className="row mb-1">
                                        <div className="col">
                                            {/* Preheading */}
                                            <a className="text-muted" href="shop.html"></a>
                                        </div>
                                        <div className="col-auto">
                                            {/* Rating */}
                                            <div
                                                className="rating font-size-xs text-dark"
                                                data-value={data.rating_average}
                                            >
                                                <div className="rating-item">
                                                    <i className="fas fa-star" />
                                                </div>
                                                <div className="rating-item">
                                                    <i className="fas fa-star" />
                                                </div>
                                                <div className="rating-item">
                                                    <i className="fas fa-star" />
                                                </div>
                                                <div className="rating-item">
                                                    <i className="fas fa-star" />
                                                </div>
                                                <div className="rating-item">
                                                    <i className="fas fa-star" />
                                                </div>
                                            </div>
                                            <a className="font-size-sm text-reset ml-2" href="#reviews">
                                                Reviews ({data?.review_count})
                                            </a>
                                        </div>
                                    </div>
                                    {/* Heading */}
                                    <h3 className="mb-2">{data?.name}</h3>
                                    {/* Price */}
                                    <div className="mb-7">
                                        <span className="font-size-lg font-weight-bold text-gray-350 text-decoration-line-through">
                                            {currency(data?.price)}
                                        </span>
                                        <span className="ml-1 font-size-h5 font-weight-bolder text-primary">
                                            {currency(data?.real_price)} vnđ
                                        </span>
                                    </div>
                                    {/* Form */}
                                    <div>
                                        <div className="form-group">
                                            {/* Label */}
                                            <p className="mb-5">
                                                <span>Màu: </span>
                                                <strong id="colorCaption">
                                                    {data?.configurable_options?.[0].values?.map(
                                                        (item) => item.label,
                                                    ) || 'Không có'}
                                                </strong>
                                            </p>
                                            {/* Radio */}
                                            <div className="mb-8 ml-n1">
                                                <div className="custom-control custom-control-inline custom-control-img">
                                                    <input
                                                        type="radio"
                                                        className="custom-control-input"
                                                        id="imgRadioOne"
                                                        name="imgRadio"
                                                        data-toggle="form-caption"
                                                        data-target="#colorCaption"
                                                        defaultValue="White"
                                                        defaultChecked
                                                    />
                                                    <label className="custom-control-label" htmlFor="imgRadioOne">
                                                        <span
                                                            className="embed-responsive embed-responsive-1by1 bg-cover"
                                                            style={{
                                                                backgroundImage: `url(${img1})`,
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                                {img2 && (
                                                    <div className="custom-control custom-control-inline custom-control-img">
                                                        <input
                                                            type="radio"
                                                            className="custom-control-input"
                                                            id="imgRadioTwo"
                                                            name="imgRadio"
                                                            data-toggle="form-caption"
                                                            data-target="#colorCaption"
                                                            defaultValue="Black"
                                                        />

                                                        <label className="custom-control-label" htmlFor="imgRadioTwo">
                                                            <span
                                                                className="embed-responsive embed-responsive-1by1 bg-cover"
                                                                style={{
                                                                    backgroundImage: `url(${img2})`,
                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row mb-7">
                                                <div className="col-12 col-lg">
                                                    <button
                                                        className="btn btn-block btn-dark mb-2"
                                                        onClick={onAddProduct}
                                                    >
                                                        Add to Cart <i className="fe fe-shopping-cart ml-2" />
                                                    </button>
                                                </div>
                                                <div className="col-12 col-lg-auto">
                                                    {/* Wishlist */}
                                                    <button
                                                        className="btn btn-outline-dark btn-block mb-2"
                                                        data-toggle="button"
                                                        onClick={onAddWishlist}
                                                    >
                                                        Wishlist <i className="fe fe-heart ml-2" />
                                                    </button>
                                                </div>
                                            </div>
                                            {/* Text */}
                                            <p>
                                                <span className="text-gray-500">Is your size/color sold out?</span>
                                                <a
                                                    className="text-reset text-decoration-underline"
                                                    data-toggle="modal"
                                                    href="#modalWaitList"
                                                >
                                                    Join the Wait List!
                                                </a>
                                            </p>
                                            {/* Share */}
                                            <p className="mb-0">
                                                <span className="mr-4">Share:</span>
                                                <a
                                                    className="btn btn-xxs btn-circle btn-light font-size-xxxs text-gray-350"
                                                    href="#!"
                                                >
                                                    <i className="fab fa-twitter" />
                                                </a>
                                                <a
                                                    className="btn btn-xxs btn-circle btn-light font-size-xxxs text-gray-350"
                                                    href="#!"
                                                >
                                                    <i className="fab fa-facebook-f" />
                                                </a>
                                                <a
                                                    className="btn btn-xxs btn-circle btn-light font-size-xxxs text-gray-350"
                                                    href="#!"
                                                >
                                                    <i className="fab fa-pinterest-p" />
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-11">
                <div className="container">
                    <div className="row">
                        <Tab defaultValue={0}>
                            <div className="col-12">
                                {/* Nav */}
                                <div className="nav nav-tabs nav-overflow justify-content-start justify-content-md-center border-bottom">
                                    {descriptTab?.map((item) => {
                                        return (
                                            <Tab.Title
                                                index={item.id}
                                                className="nav-link active"
                                                data-toggle="tab"
                                                // href={`/${}`}
                                            >
                                                {item.title}
                                            </Tab.Title>
                                        );
                                    })}
                                    {/* <Tab.Title
                                        index={0}
                                        className="nav-link active"
                                        data-toggle="tab"
                                        href="#descriptionTab"
                                    >
                                        Description
                                    </Tab.Title>
                                    <Tab.Title index={1} className="nav-link" data-toggle="tab" href="#sizeTab">
                                        Size &amp; Fit
                                    </Tab.Title>
                                    <Tab.Title index={2} className="nav-link" data-toggle="tab" href="#shippingTab">
                                        Shipping &amp; Return
                                    </Tab.Title> */}
                                </div>
                                {/* Content */}
                                <div className="tab-content">
                                    <Tab.Content index={0} className="tab-pane fade show active" id="descriptionTab">
                                        <div className="row justify-content-center py-9">
                                            <div className="col-12 col-lg-10 col-xl-8">
                                                <div className="row">
                                                    <div className="col-12">
                                                        {/* Text */}
                                                        <p className="text-gray-500">{data?.short_description}</p>
                                                    </div>
                                                    <div className="col-12 col-md-12">
                                                        <ul className="list list-unstyled mb-0">
                                                            {data?.specifications &&
                                                                data?.specifications.map((item) =>
                                                                    item.attributes.map((e) => (
                                                                        <li key={e.name}>
                                                                            <strong>{e.name}</strong>: {e.value}
                                                                        </li>
                                                                    )),
                                                                )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Content>
                                    <Tab.Content index={1} className="tab-pane fade" id="sizeTab">
                                        <div className="row justify-content-center py-9">
                                            <div className="col-12 col-lg-10 col-xl-8">
                                                <div className="row">
                                                    <div className="col-12 col-md-12">
                                                        {/* Text */}
                                                        <p className="mb-4">
                                                            <strong>Top Features:</strong>
                                                        </p>
                                                        {/* List */}
                                                        <ul className="mb-md-0 text-gray-500">
                                                            {data?.top_features &&
                                                                data?.top_features.map((item) => (
                                                                    <li key={item}>{item}</li>
                                                                ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Content>
                                    <Tab.Content index={2} className="tab-pane fade" id="shippingTab">
                                        <div className="table-responsive mb-6 py-9">
                                            <table className="table table-bordered table-sm table-hover mb-0">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div>
                                                                <span>Tiêu chuẩn</span>
                                                            </div>
                                                        </td>
                                                        <td>Delivery in 5 - 7 working days</td>
                                                        <td>14.000 vnđ</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div>
                                                                <span>Giao hàng nhanh</span>
                                                            </div>
                                                        </td>
                                                        <td>Delivery in 3 - 5 working days</td>
                                                        <td>35.000 vnđ</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <p className="mb-0 text-gray-500">
                                                May, life blessed night so creature likeness their, for.{' '}
                                                <a className="text-body text-decoration-underline" href="#!">
                                                    Find out more
                                                </a>
                                            </p>
                                        </div>
                                    </Tab.Content>
                                </div>
                            </div>
                        </Tab>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProductDetail;
