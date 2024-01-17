import { Spin, message } from 'antd';
import { useAsync } from '../core/hooks';
import { userService } from '../services/user.service';
import { useDispatch } from 'react-redux';
import { getAddressAction } from '../store/userReducer';
import { useState } from 'react';
import styled from 'styled-components';
import { Link, generatePath } from 'react-router-dom';
import { path } from '../config/path';

const Wrap = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: red;
`;

function AddressItem({ address }) {
    const dispatch = useDispatch();

    const { excute: deleteItem, loading } = useAsync(userService.deleteAddress);

    const onDelete = async () => {
        try {
            const res = await deleteItem(address._id);
            message.success(res.message);
            dispatch(getAddressAction());
        } catch (error) {
            message.error(error.message);
        }
    };

    const editPath = generatePath(path.Account.AddressEdit, {
        action: 'edit',
        '*': address._id,
    });

    return (
        <>
            <div className="col-12 col-lg-6">
                {/* Card */}
                <div className="card card-lg bg-light mb-8">
                    <div className="card-body" style={address.default ? { border: '2px dashed' } : {}}>
                        {/* Heading */}
                        <h6 className="mb-6">Shipping Address</h6>
                        {/* Text */}
                        <p className="text-muted mb-0">
                            {address.fullName} <br />
                            {address.email}
                            <br />
                            {address.phone} <br />
                            {address.province} <br />
                            {address.district} <br />
                            {address.address}
                        </p>
                        {/* Action */}
                        <div className="card-action card-action-right">
                            {/* Button */}
                            <Link
                                className="btn btn-xs btn-circle btn-white-primary"
                                href="account-address-edit.html"
                                to={editPath}
                            >
                                <i className="fe fe-edit-2" />
                            </Link>
                            {/* Button */}
                            {loading ? (
                                <Spin />
                            ) : (
                                <button className="btn btn-xs btn-circle btn-white-primary" onClick={onDelete}>
                                    <i className="fe fe-x" />
                                </button>
                            )}
                        </div>
                        {address.default && <Wrap>Default</Wrap>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddressItem;
