import { Drawer, Skeleton } from 'antd';
import { useMemo, useState } from 'react';
import { useAsync } from '../core/hooks/useAsync';
import { productService } from '../services/product.service';
import { currency } from '../utils/currency';
import { path } from '../config/path';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleSearchDrawerAction } from './../store/pageReducer';
import { usePage } from '../hooks/usePage';
import { useCategory } from '../hooks/useCategory';

function SearchDrawer() {
    const [product, setProduct] = useState([]);
    const [option, setOption] = useState('All Categories');
    const [message, setMessage] = useState('');
    let [value, setValue] = useState('');
    const { openSearchModal } = usePage();
    const { categories } = useCategory();
    const dispatch = useDispatch();

    const { excute: getProduct, loading } = useAsync(productService.getProduct);

    const onSearch = async (e) => {
        e.preventDefault();
        const vl = value.trim();

        if (vl) {
            setMessage('');
            const product = await getProduct(
                `?limit=5&name=${vl}${option !== 'All Categories' ? `&categories=${option}` : ''}`,
            );
            setProduct(product.data);
            if (product.data.length === 0) {
                setMessage(`Không tìm thấy kết quả cho "${vl}"`);
            }
        }
    };

    const productLength = product.length > 0;

    const onViewAll = () => {
        dispatch(toggleSearchDrawerAction());
    };

    const pathLink = path.Shop + '?search=' + value;

    return (
        <Drawer open={openSearchModal} headerStyle={{ display: 'none' }} bodyStyle={{ padding: 0 }}>
            <div className="modal-dialog modal-dialog-vertical" role="document">
                <div className="modal-content">
                    {/* Close */}
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() => dispatch(toggleSearchDrawerAction())}
                    >
                        <i className="fe fe-x" aria-hidden="true" />
                    </button>
                    {/* Header*/}
                    <div className="modal-header line-height-fixed font-size-lg">
                        <strong className="mx-auto">Search Products</strong>
                    </div>
                    {/* Body: Form */}
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label className="sr-only">Categories:</label>
                                <select
                                    className="custom-select"
                                    value={option}
                                    onChange={(e) => setOption(e.target.value)}
                                >
                                    <option>All Categories</option>
                                    {categories?.map((e) => (
                                        <option key={e.id} value={e.id}>
                                            {e.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group input-group-merge">
                                <input
                                    value={value}
                                    onChange={(ev) => setValue(ev.currentTarget.value)}
                                    className="form-control"
                                    type="search"
                                    placeholder="Search"
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-border" type="submit" onClick={onSearch}>
                                        <i className="fe fe-search" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* Body: Results (add `.d-none` to disable it) */}
                    <div className="modal-body border-top font-size-sm">
                        {/* Heading */}
                        <p>Search Results:</p>
                        {/* Items */}
                        {message && <p style={{ color: 'red' }}>{message}</p>}
                        {loading
                            ? [...Array(5)].map((e, i) => <Skeleton key={i} style={{ height: 100, marginTop: 10 }} />)
                            : product.map((item) => (
                                  <div key={item.id} className="row align-items-center position-relative mb-5">
                                      <div className="col-4 col-md-3">
                                          <img className="img-fluid" src={item.images?.[0]?.thumbnail_url} alt="..." />
                                      </div>
                                      <div className="col position-static">
                                          {/* Text */}
                                          <p className="mb-0 font-weight-bold">
                                              <a className="stretched-link text-body" href="./product.html">
                                                  {item.name}
                                              </a>
                                              <br />
                                              <span className="text-muted">{currency(item.real_price)}</span>
                                          </p>
                                      </div>
                                  </div>
                              ))}

                        {/* Button */}
                        <Link
                            className="btn btn-link px-0 text-reset"
                            to={pathLink}
                            onClick={onViewAll}
                            style={!productLength ? { pointerEvents: 'none' } : {}}
                        >
                            View All <i className="fe fe-arrow-right ml-2" />
                        </Link>
                    </div>
                    {/* Body: Empty (remove `.d-none` to disable it) */}
                    <div className="d-none modal-body">
                        {/* Text */}
                        <p className="mb-3 font-size-sm text-center">Nothing matches your search</p>
                        <p className="mb-0 font-size-sm text-center">😞</p>
                    </div>
                </div>
            </div>
        </Drawer>
    );
}

export default SearchDrawer;
