import { useEffect } from 'react';
import { currency } from '../utils/currency';

function WishlistItem({ name, real_price, images, id, onRemoveWishlist }) {
    const img1 = images?.[0]?.thumbnail_url;

    return (
        <div className="col-6 col-md-4">
            <div className="card mb-7">
                {/* Image */}
                <div className="card-img">
                    {/* Action */}
                    <button
                        className="btn btn-xs btn-circle btn-white-primary card-action card-action-right"
                        onClick={onRemoveWishlist}
                    >
                        <i className="fe fe-x" />
                    </button>

                    {/* Image */}
                    <img className="card-img-top" src={img1} alt="..." />
                </div>
                {/* Body */}
                <div className="card-body font-weight-bold text-center">
                    <a className="text-body" href="product.html">
                        {name}
                    </a>
                    <br />
                    <span className="text-muted">{currency(real_price)} vnđ</span>
                </div>
            </div>
        </div>
    );
}

export default WishlistItem;
