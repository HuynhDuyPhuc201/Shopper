import { currency } from '../utils/currency';
import { Spin } from 'antd';
import { useProductCard } from '../core/hooks/useProductCard';
import { path } from '../config/path';
import { Link, generatePath } from 'react-router-dom';

function ProductCard({ name, price, real_price, images, id, slug, description, categoryDetail }) {
    const img1 = images?.[0]?.thumbnail_url;
    const img2 = images?.[1]?.thumbnail_url || img1;

    const { onAddProduct, onAddWishlist, loading, loadingWishlist } = useProductCard({ name, id });

    // const pathURL = generatePath(path.ProductDetail, { slug, id });
    return (
        <div className="col-6 col-md-4">
            {/* Card */}
            <div className="card mb-7">
                {/* Badge */}
                <div className="badge badge-white card-badge card-badge-left text-uppercase">New</div>
                {/* Image */}
                <div className="card-img">
                    {/* Image */}
                    <Link className="card-img-hover" to={`/product-detail/${slug}/${id}`}>
                        <img className="card-img-top card-img-back" src={img1} alt="..." />
                        <img className="card-img-top card-img-front" src={img2} alt="..." />
                    </Link>
                    {/* Actions */}
                    <div className="card-actions">
                        <span className="card-action">
                            {loading ? (
                                <Spin />
                            ) : (
                                <button
                                    onClick={onAddProduct}
                                    className="btn btn-xs btn-circle btn-white-primary"
                                    data-toggle="button"
                                >
                                    <i className="fe fe-shopping-cart" />
                                </button>
                            )}
                        </span>
                        <span className="card-action">
                            {loadingWishlist ? (
                                <Spin />
                            ) : (
                                <button
                                    className="btn btn-xs btn-circle btn-white-primary"
                                    data-toggle="button"
                                    onClick={onAddWishlist}
                                >
                                    <i className="fe fe-heart" />
                                </button>
                            )}
                        </span>
                    </div>
                </div>
                {/* Body */}
                <div className="card-body px-0">
                    {/* Category */}
                    <div className="font-size-xs">
                        <Link className="text-muted" to={`/product-detail/${slug}/${id}`}>
                            {name}
                        </Link>
                    </div>

                    <div className="font-weight-bold  text-decoration-line-through">{currency(price)}</div>
                    <div className="font-weight-bolder  text-primary">{currency(real_price)} vnđ</div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
