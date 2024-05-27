import React from 'react';
import { useCurrentPage } from '~/core/hooks/useCurrentPage';
import Paginate from '~/components/Paginate';
import { useAsync, useQuery } from '~/core';
import { orderService } from '~/services/order.service';
import { currency } from '~/utils/currency';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { path } from '~/config/path';
import { Skeleton } from 'antd';
import { useDispatch } from 'react-redux';
import { getCartAction } from '~/store/cartReducer';
import Button from '~/components/Button';

function MyOrder() {
    const { currentPage } = useCurrentPage();

    const { data, paginate, loading } = useQuery(() => {
        // nếu mà có `?limit=3&page=${currentPage}` phải thêm query trong orderService
        return orderService.getAllOrder(`?page=${currentPage}`);
    }, [currentPage]);

    const renderImage = (listItems) => {
        const list = [];
        if (listItems.length >= 5) {
            for (let i = 0; i < 3; i++) {
                const item = listItems[i];
                list.push(
                    <div className="col-3">
                        <div
                            className="embed-responsive embed-responsive-1by1 bg-cover"
                            style={{ backgroundImage: `url(${item.product.thumbnail_url})` }}
                        />
                    </div>,
                );
            }
            list.push(
                <div className="col-3">
                    <div className="embed-responsive embed-responsive-1by1 bg-light">
                        <a className="embed-responsive-item embed-responsive-item-text text-reset" href="#!">
                            <div className="font-size-xxs font-weight-bold">
                                +{listItems.length - 3} <br /> more
                            </div>
                        </a>
                    </div>
                </div>,
            );
        } else {
            for (let item of listItems) {
                list.push(
                    <div className="col-3">
                        {/* Image */}
                        <div
                            className="embed-responsive embed-responsive-1by1 bg-cover"
                            style={{ backgroundImage: `url(${item.product.thumbnail_url})` }}
                        />
                    </div>,
                );
            }
        }
        return list;
    };

    return (
        <>
            {/* Order */}
            {loading
                ? [...Array(3)].map((item, i) => <Skeleton active key={i} style={{ height: 200 }} />)
                : data?.map((item, index) => (
                      <div className="card card-lg mb-5 border" key={item._id}>
                          <div className="card-body pb-0">
                              {/* Info */}
                              <div className="card card-sm">
                                  <div className="card-body bg-light">
                                      <div className="row">
                                          <div className="col-6 col-lg-3">
                                              {/* Heading */}
                                              <h6 className="heading-xxxs text-muted">Order No:</h6>
                                              {/* Text */}
                                              <p className="mb-lg-0 font-size-sm font-weight-bold">{item._id}</p>
                                          </div>
                                          <div className="col-6 col-lg-3">
                                              {/* Heading */}
                                              <h6 className="heading-xxxs text-muted">Shipped date:</h6>
                                              {/* Text */}
                                              <p className="mb-lg-0 font-size-sm font-weight-bold">
                                                  <time dateTime="2019-09-07">{item.type}</time>
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
                                              <p className="mb-0 font-size-sm font-weight-bold">
                                                  {currency(item.total)} vnđ
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="card-footer">
                              <div className="row align-items-center">
                                  <div className="col-12 col-lg-6">
                                      <div className="form-row mb-4 mb-lg-0">{renderImage(item.listItems)}</div>
                                  </div>
                                  <div className="col-12 col-lg-6">
                                      {/* Button */}
                                      <Link
                                          className="btn btn-sm btn-block btn-outline-dark"
                                          to={generatePath(path.Account.MyOrderDetail, { id: item._id })}
                                      >
                                          Order Details
                                      </Link>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
            {/* Pagination */}
            <Paginate totalPage={paginate.totalPage} />
        </>
    );
}

export default MyOrder;
