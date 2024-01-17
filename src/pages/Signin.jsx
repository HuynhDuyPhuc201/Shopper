import React from 'react';
import { Link } from 'react-router-dom';
import { path } from '../config/path';

function Signin() {
    return (
        <section className="py-12">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                        {/* Icon */}
                        <div className="mb-7 font-size-h1">🙂</div>
                        {/* Heading */}
                        <h2 className="mb-5">Kích hoạt tài khoản Thành Công!!!</h2>
                        {/* Text */}
                        <p className="mb-7 text-gray-500">
                            Bạn vừa đăng ký tài khoản thành công, vui lòng click vào link bên dưới để đăng nhập
                        </p>
                        {/* Button */}
                        <Link className="btn btn-dark" to={path.Auth}>
                            Go to Signin
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signin;
