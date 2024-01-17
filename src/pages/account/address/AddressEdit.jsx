import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { useAsync, useForm, useQuery } from '../../../core/hooks';
import { userService } from '../../../services/user.service';
import { path } from '../../../config/path';
import { message } from 'antd';
import { getAddressAction } from '../../../store/userReducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function AddressEdit() {
    const nagivate = useNavigate();
    const dispatch = useDispatch();

    const params = useParams();
    const action = params.action;
    const id = params['*'];

    const { validate, register, form, setForm } = useForm({
        fullName: [{ required: true }],
        email: [{ required: true }, { regexp: 'email' }],
        phone: [{ required: true }, { regexp: 'phone' }],
        province: [{ required: true }],
        district: [{ required: true }],
        address: [{ required: true }],
    });

    const { excute: addAddress } = useAsync(userService.addAddress);
    const { excute: editAddress } = useAsync(userService.editAddress);

    const { data: dataAddress } = useQuery(() => userService.getAddress(id), [id]);
    useEffect(() => {
        if (id && dataAddress) {
            setForm(dataAddress);
        }
    }, [dataAddress]);

    const onsetDefault = (e) => {
        if (e.target.checked) {
            setForm({
                ...form,
                default: true,
            });
        }
    };
    const onAddress = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                if (action === 'new') {
                    await addAddress(form);
                    message.success('Thêm địa chỉ thành công');
                } else {
                    await editAddress(id, form);
                    message.success('Cập nhật địa chỉ thành công');
                }
                nagivate(path.Account.Address);
                dispatch(getAddressAction());
            } catch (error) {}
        }
    };

    if (!['new', 'edit'].includes(action)) {
        return nagivate(path.Account.Address);
    }
    return (
        <>
            <h6 className="mb-7">Add Address</h6>
            {/* Form */}
            <form onSubmit={onAddress}>
                <div className="row">
                    <div className="col-12 ">
                        <Input label="Full Name" placeholder="Full Name" {...register('fullName')} />
                    </div>
                    <div className="col-12 col-md-6">
                        <Input label="Email Address" placeholder="Email Address" {...register('email')} />
                    </div>
                    <div className="col-12 col-md-6">
                        <Input label="Phone" placeholder="Phone" {...register('phone')} />
                    </div>
                    <div className="col-12 col-md-6">
                        <Input label="Province" placeholder="Province" {...register('province')} />
                    </div>
                    <div className="col-12 col-md-6">
                        <Input label="District" placeholder="District" {...register('district')} />
                    </div>
                    <div className="col-12">
                        <Input label="Address" placeholder="Address" {...register('address')} />
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <div className="custom-control custom-checkbox mb-3">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="defaultDeliveryAddress"
                                    onClick={onsetDefault}
                                />
                                <label className="custom-control-label" htmlFor="defaultDeliveryAddress">
                                    Default delivery address
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Button */}
                <Button>Add Address</Button>
            </form>
        </>
    );
}

export default AddressEdit;
