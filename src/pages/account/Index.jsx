import Input from '../../components/Input';
import { useAsync } from '../../core/hooks';
import { userService } from '../../services/user.service';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
import { setUserInfoAciton } from '../../store/userReducer';
import { message } from 'antd';
import { useForm } from './../../core/hooks/useForm';
import { validate as _validate } from './../../core/utils/validate';
import { useAuth } from '../../hooks/useAuth';

function Profile() {
    const { user } = useAuth();
    const dispatch = useDispatch();

    const { excute: updateInfo, error, loading } = useAsync(userService.updateInfo);
    const {
        excute: changePassword,
        error: errorPassword,
        loading: loadingPassword,
        setError: setErrorPassword,
    } = useAsync(userService.changePassword);

    const { form, register, validate, setError } = useForm(
        {
            name: [{ required: true }],
        },
        user,
    );

    const onSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            if (form.name) {
                try {
                    await updateInfo(form);
                    dispatch(setUserInfoAciton());

                    if (form.currentPassword || form.newPassword) {
                        const errObj = _validate(form, {
                            newPassword: [
                                { required: true },
                                { min: 6, max: 32 },
                                {
                                    regexp: 'password',
                                    message: 'Password phải chứa kí tự thường, hoa, số và kí tự đặc biệt',
                                },
                                {
                                    compare: 'currentPassword',
                                },
                            ],
                            currentPassword: [
                                { required: true },
                                { min: 6, max: 32 },
                                {
                                    regexp: 'password',
                                },
                            ],
                        });

                        setError(errObj);

                        if (Object.keys(errObj).length === 0) {
                            await changePassword(form);
                        }
                    }

                    message.success('Cập nhật thành công');
                } catch (error) {
                    setErrorPassword(error.error || error.message);
                }
            }
        }
    };

    return (
        <>
            {(error || errorPassword) && <p style={{ color: 'red' }}>{error || errorPassword}</p>}
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-12">
                        <Input label="Full Name *" placeholder="Full Name *" {...register('name')} />
                    </div>
                    <div className="col-12">
                        <Input
                            label="Email Address *"
                            placeholder="Email Address *"
                            disabled
                            {...register('username')}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <Input
                            type="password"
                            label="Current Password *"
                            placeholder="Current Password *"
                            {...register('currentPassword')}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <Input
                            type="password"
                            label="New Password *"
                            placeholder="New Password *"
                            {...register('newPassword')}
                        />
                    </div>
                    <div className="col-12 col-lg-6">
                        {/* Birthday */}
                        <div className="form-group">
                            {/* Label */}
                            <label>Date of Birth</label>
                            {/* Inputs */}
                            <div className="form-row">
                                <div className="col-auto">
                                    {/* Date */}
                                    <label className="sr-only" htmlFor="accountDate">
                                        Date
                                    </label>
                                    <select className="custom-select custom-select-sm" id="accountDate">
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                    </select>
                                </div>
                                <div className="col">
                                    {/* Date */}
                                    <label className="sr-only" htmlFor="accountMonth">
                                        Month
                                    </label>
                                    <select className="custom-select custom-select-sm" id="accountMonth">
                                        <option>January</option>
                                        <option>February</option>
                                        <option>March</option>
                                    </select>
                                </div>
                                <div className="col-auto">
                                    {/* Date */}
                                    <label className="sr-only" htmlFor="accountYear">
                                        Year
                                    </label>
                                    <select className="custom-select custom-select-sm" id="accountYear">
                                        <option>1990</option>
                                        <option>1991</option>
                                        <option>1992</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        {/* Gender */}
                        <div className="form-group mb-8">
                            <label>Gender</label>
                            <div className="btn-group-toggle" data-toggle="buttons">
                                <label className="btn btn-sm btn-outline-border active">
                                    <input type="radio" name="gender" defaultChecked /> Male
                                </label>
                                <label className="btn btn-sm btn-outline-border">
                                    <input type="radio" name="gender" /> Female
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        {/* Button */}
                        <Button className="btn btn-dark" type="submit" loading={loading || loadingPassword}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Profile;
