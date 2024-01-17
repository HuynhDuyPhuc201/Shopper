import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { path } from '../config/path';
import { useDispatch } from 'react-redux';
import { removeToken, removeUser } from '../core/token';
import { useAuth } from '../hooks/useAuth';
import { logoutAction } from '../store/userReducer';

function ProfileLayout() {
    const { user } = useAuth();
    const dispatch = useDispatch();

    const onLogout = (e) => {
        e.preventDefault();
        removeToken();
        removeUser();
        dispatch(logoutAction());
        window.location.reload();
        <Navigate to={path.Auth} />;
    };

    if (!user) return <Navigate to={path.Auth} />;

    return (
        <section className="pt-7 pb-12">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h3 className="mb-10">My Account</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-3">
                        {/* Nav */}
                        <nav className="mb-10 mb-md-0">
                            <div className="list-group list-group-sm list-group-strong list-group-flush-x">
                                <NavLink
                                    className="list-group-item list-group-item-action dropright-toggle list-group-account"
                                    to={path.Account.MyOrder}
                                >
                                    Orders
                                </NavLink>
                                <NavLink
                                    className="list-group-item list-group-item-action dropright-toggle list-group-account"
                                    to={path.Account.Wishlist}
                                >
                                    Widhlist
                                </NavLink>
                                <NavLink
                                    className="list-group-item list-group-item-action dropright-toggle list-group-account"
                                    to=""
                                >
                                    Personal Info
                                </NavLink>
                                <NavLink
                                    className="list-group-item list-group-item-action dropright-toggle list-group-account"
                                    to={path.Account.Address}
                                >
                                    Addresses
                                </NavLink>
                                <a
                                    className="list-group-item list-group-item-action dropright-toggle"
                                    href="#"
                                    onClick={onLogout}
                                >
                                    Logout
                                </a>
                            </div>
                        </nav>
                    </div>
                    <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
                        <Outlet />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfileLayout;
