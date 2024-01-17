import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import Input from '../components/Input';
import { useForm } from './../core/hooks/useForm';
import { loginAction, registerAction } from '../store/authReducer';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { path } from '../config/path';
import { message } from 'antd';
import { useAuth } from '../hooks/useAuth';

function Auth() {
    const dispatch = useDispatch();
    const [errMess, setErrMess] = useState();
    const [loading, setLoading] = useState();
    const [errMessRegister, setErrMessRegister] = useState();
    const [loadingRegister, setLoadingRegister] = useState();

    const { user } = useAuth();

    const registerForm = useForm({
        name: [{ required: true }],
        username: [{ required: true }, { regexp: 'email' }],
        password: [
            { required: true },
            { min: 6, max: 32 },
            { regexp: 'password', message: 'Password phải chứa kí tự thường, hoa, số và kí tự đặc biệt' },
        ],
        confirmPassword: [{ required: true }, { confirm: 'password' }],
    });

    const loginForm = useForm({
        username: [{ required: true }, { regexp: 'email' }],
        password: [{ required: true }, { min: 6, max: 32 }, { regexp: 'password' }],
    });

    const onLogin = async (e) => {
        e.preventDefault();
        if (loginForm.validate()) {
            setLoading(true);
            dispatch(
                loginAction({
                    form: loginForm.form,
                    success: () => {
                        setLoading(false);
                    },
                    error: (err) => {
                        setLoading(false);
                        setErrMess(err.message);
                    },
                }),
            );
        }
    };

    const onRegister = async (e) => {
        e.preventDefault();

        if (registerForm.validate()) {
            setLoadingRegister(true);
            setErrMessRegister('');
            dispatch(
                registerAction({
                    form: registerForm.form,
                    success: (res) => {
                        setLoadingRegister(false);
                        message.success(res.message);
                    },
                    error: (err) => {
                        setLoadingRegister(false);
                        setErrMessRegister(err.message);
                    },
                }),
            );
        }

        // if (registerForm.form.confirmPassword !== registerForm.form.password) {
        //     registerForm.setError((prevState) => ({ ...prevState, confirmPassword: 'Vui vòng điền giống password' }));
        //     return;
        // }

        // dispatch(
        //     loginAction({
        //         form: {
        //             username: registerForm.form.username,
        //             password: registerForm.form.password,
        //         },
        //         // success: () => {
        //         //     message.success(messRegister);
        //         // },
        //     }),
        // );

        // if (registerForm.validate()) {
        //     setLoadingRegister(true);
        //     setErrMessRegister('');
        //     dispatch(
        //         registerAction({
        //             form: registerForm.form,
        //             success: () => {
        //                 setLoadingRegister(false);
        //             },
        //             error: (err) => {
        //                 setLoadingRegister(false);
        //                 setErrMessRegister(err.message);
        //             },
        //         }),
        //     );
        // }
    };

    if (user) return <Navigate to={path.Account.Profile} />;

    return (
        <section className="py-12">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        {/* Card */}
                        <div className="card card-lg mb-10 mb-md-0">
                            <div className="card-body">
                                {/* Heading */}
                                <h6 className="mb-7">Returning Customer</h6>
                                {/* Form */}
                                {errMess && <p style={{ color: 'red' }}>{errMess}</p>}
                                <form onSubmit={onLogin}>
                                    <div className="row">
                                        <div className="col-12">
                                            {/* Email */}
                                            <Input placeholder="Email Address *" {...loginForm.register('username')} />
                                        </div>
                                        <div className="col-12">
                                            {/* Password */}
                                            <Input
                                                placeholder="Password *"
                                                type="password"
                                                {...loginForm.register('password')}
                                                // defaultValue={loginForm.form.password}
                                                // onChange={(ev) => (loginForm.form.password = ev.target.value)}
                                                // error={loginForm.error.password}
                                            />
                                        </div>

                                        <div className="col-12 col-md">
                                            {/* Remember */}
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        className="custom-control-input"
                                                        id="loginRemember"
                                                        type="checkbox"
                                                    />
                                                    <label className="custom-control-label" htmlFor="loginRemember">
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-auto">
                                            {/* Link */}
                                            <div className="form-group">
                                                <a
                                                    className="font-size-sm text-reset"
                                                    data-toggle="modal"
                                                    href="#modalPasswordReset"
                                                >
                                                    Forgot Password?
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            {/* Button */}
                                            <Button loading={loading}>Sign In</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        {/* Card */}
                        <div className="card card-lg">
                            <div className="card-body">
                                {/* Heading */}
                                <h6 className="mb-7">New Customer</h6>
                                {/* Form */}
                                {errMessRegister && <p style={{ color: 'red' }}>{errMessRegister}</p>}
                                <form onSubmit={onRegister}>
                                    <div className="row">
                                        <div className="col-12">
                                            {/* Email */}
                                            <Input placeholder="Full Name *" {...registerForm.register('name')} />
                                        </div>
                                        <div className="col-12">
                                            {/* Email */}
                                            <Input placeholder="Email *" {...registerForm.register('username')} />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            {/* Password */}
                                            <Input
                                                placeholder="Password *"
                                                type="password"
                                                {...registerForm.register('password')}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            {/* Password */}
                                            <Input
                                                placeholder="Confirm Paswword"
                                                type="password"
                                                {...registerForm.register('confirmPassword')}
                                            />
                                        </div>
                                        <div className="col-12 col-md-auto">
                                            {/* Link */}
                                            <div className="form-group font-size-sm text-muted">
                                                By registering your details, you agree with our Terms &amp; Conditions,
                                                and Privacy and Cookie Policy.
                                            </div>
                                        </div>
                                        <div className="col-12 col-md">
                                            {/* Newsletter */}
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        className="custom-control-input"
                                                        id="registerNewsletter"
                                                        type="checkbox"
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="registerNewsletter"
                                                    >
                                                        Sign me up for the Newsletter!
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            {/* Button */}
                                            <Button loading={loadingRegister}>Register</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Auth;
