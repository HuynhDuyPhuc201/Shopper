import { Link, generatePath } from 'react-router-dom';
import { path } from '../../../config/path';
import AddressItem from '../../../components/AddressItem';
import { useAuth } from '../../../hooks/useAuth';
import { getAddressAction } from '~/store/userReducer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Address() {
    const { dataAddress } = useAuth();
    const newPath = generatePath(path.Account.AddressEdit, { action: 'new' });
    const dispatch = useDispatch();

    useEffect(() => {
        if (dataAddress === null) {
            dispatch(getAddressAction());
        }
    }, [dataAddress]);
    return (
        <>
            <div className="row">
                {dataAddress?.map((item, index) => (
                    <AddressItem key={index} address={item} />
                ))}
                <div className="col-12">
                    {/* Button */}
                    <Link className="btn btn-block btn-lg btn-outline-border" to={newPath}>
                        Add Address <i className="fe fe-plus" />
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Address;
