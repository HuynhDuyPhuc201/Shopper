import { Link, NavLink, useLocation, useParams, useSearchParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCard from '../components/ProductCard';
import { useQuery } from './../core/hooks/useQuery';
import { productService } from './../services/product.service';
import { Skeleton } from 'antd';
import { useCategory } from '../hooks/useCategory';
import { useCategoryDetail } from '../hooks/useCategoryDetail';
import { useEffect, useState } from 'react';
import { path } from '~/config/path';
import LoadingCard from '../components/loading/LoadingCard';
import { Slider } from '~/components/Slider';

function Shop() {
    const [searchParams] = useSearchParams();

    const currentPage = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search');

    const { catId } = useParams();
    let location = useLocation().pathname;

    useEffect(() => {
        if (catId) {
            getProductAgain();
        }
        return () => {
            // cleanup func
            setData([]);
        };
    }, [catId]);

    const {
        excute: getProductAgain,
        setData,
        data,
        loading,
        paginate,
    } = useQuery(() => {
        return productService.getProduct(
            `?page=${currentPage}${search ? `&name=${search}` : ''}${catId ? `&categories=${catId}` : ''}`,
        );
    }, [currentPage, search]);

    const { categories, loading: categoryLoading } = useCategory();
    const categoryDetail = useCategoryDetail(catId);

    return (
        <section className="py-11">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4 col-lg-3">
                        {/* Filters */}
                        <form className="mb-10 mb-md-0">
                            <ul className="nav nav-vertical" id="filterNav">
                                <li className="nav-item">
                                    {/* Toggle */}
                                    <a
                                        className="nav-link dropdown-toggle font-size-lg text-reset border-bottom mb-6"
                                        data-toggle="collapse"
                                    >
                                        Category
                                    </a>
                                    {/* Collapse */}
                                    <div className="collapse show">
                                        <div className="form-group">
                                            <ul className="list-styled mb-0" id="productsNav">
                                                <li className="list-styled-item">
                                                    <NavLink className="list-styled-link" to={path.Shop}>
                                                        All Products
                                                    </NavLink>
                                                </li>
                                                {!categoryLoading ? (
                                                    <Skeleton />
                                                ) : (
                                                    categories?.map((e) => (
                                                        <li key={e.id} className="list-styled-item">
                                                            {/* Toggle */}
                                                            <NavLink
                                                                className="list-styled-link"
                                                                data-toggle="collapse"
                                                                to={`/${e.slug}`}
                                                            >
                                                                {e.title}
                                                            </NavLink>
                                                        </li>
                                                    ))
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </form>
                    </div>
                    <div className="col-12 col-md-8 col-lg-9">
                        {/* Slider */}

                        <div className="flickity-page-dots-inner mb-9" data-flickity='{"pageDots": true}'>
                            <Slider spaceBetween="0">
                                <div
                                    className="card bg-h-100 bg-left"
                                    style={{ backgroundImage: 'url(/img/covers/cover-24.jpg)' }}
                                >
                                    <div className="row" style={{ minHeight: '400px' }}>
                                        <div className="col-12 col-md-10 col-lg-8 col-xl-6 align-self-center">
                                            <div className="card-body px-md-10 py-11">
                                                {/* Heading */}
                                                <h4>2019 Summer Collection</h4>
                                                {/* Button */}
                                                <a className="btn btn-link px-0 text-body" href="#!">
                                                    View Collection <i className="fe fe-arrow-right ml-2" />
                                                </a>
                                            </div>
                                        </div>
                                        <div
                                            className="col-12 col-md-2 col-lg-4 col-xl-6 d-none d-md-block bg-cover"
                                            style={{ backgroundImage: 'url(/img/covers/cover-16.jpg)' }}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="card bg-cover"
                                    style={{ backgroundImage: 'url(/img/covers/cover-29.jpg)' }}
                                >
                                    <div className="row align-items-center" style={{ minHeight: '400px' }}>
                                        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                                            <div className="card-body px-md-10 py-11">
                                                {/* Heading */}
                                                <h4 className="mb-5">Get -50% from Summer Collection</h4>
                                                {/* Text */}
                                                <p className="mb-7">
                                                    Appear, dry there darkness they're seas. <br />
                                                    <strong className="text-primary">Use code 4GF5SD</strong>
                                                </p>
                                                {/* Button */}
                                                <Link className="btn btn-outline-dark" to={path.Shop}>
                                                    Shop Now <i className="fe fe-arrow-right ml-2" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="card bg-cover"
                                    style={{ backgroundImage: 'url(/img/covers/cover-30.jpg)' }}
                                >
                                    <div className="row align-items-center" style={{ minHeight: '400px' }}>
                                        <div className="col-12">
                                            <div className="card-body px-md-10 py-11 text-center text-white">
                                                {/* Preheading */}
                                                <p className="text-uppercase">Enjoy an extra</p>
                                                {/* Heading */}
                                                <h1 className="display-4 text-uppercase">50% off</h1>
                                                {/* Link */}
                                                <a className="link-underline text-reset" to={path.Shop}>
                                                    Shop Collection
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                        {/* Header */}
                        <div className="row align-items-center mb-7">
                            <div className="col-12 col-md">
                                {/* Heading */}
                                <h3 className="mb-1">{categoryDetail?.title || 'All Products'}</h3>
                                {/* Breadcrumb */}
                                <ol className="breadcrumb mb-md-0 font-size-xs text-gray-400">
                                    <li className="breadcrumb-item">
                                        <a className="text-gray-400" href="/">
                                            Home
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        {categoryDetail?.title || 'All Products'}
                                    </li>
                                </ol>
                            </div>
                            <div className="col-12 col-md-auto">
                                {/* <button onClick={LowToHight}>low to hight</button>
                                <button onClick={HightToLow}>hight to low</button> */}

                                {/* <select className="custom-select custom-select-xs">
                                    {options.map((item) => (
                                        <option value={item} onClick={onOptions(item)}>
                                            {item}
                                        </option>
                                    ))}
                                </select> */}
                            </div>
                        </div>
                        {/* Tags */}
                        <div className="row mb-7">
                            <div className="col-12">
                                <span className="btn btn-xs btn-light font-weight-normal text-muted mr-3 mb-3">
                                    {categoryDetail?.title || 'All Products'}
                                    <a className="text-reset ml-2" href="#!" role="button">
                                        <i className="fe fe-x" />
                                    </a>
                                </span>
                            </div>
                        </div>
                        {/* Products */}
                        {search && <p style={{ fontSize: 30 }}>Kết quả tìm kiếm cho `{search}`</p>}
                        <div className="row">
                            {loading
                                ? [...Array(6)].map((item, index) => <LoadingCard key={index} />)
                                : data?.map((item, index) => (
                                      <ProductCard key={index} {...item} categoryDetail={categoryDetail} />
                                  ))}
                        </div>
                        {/* Pagination */}
                        <Paginate totalPage={paginate.totalPage} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Shop;
