import { lazy } from 'react';
import { path } from './config/path';
import Page404 from './pages/404';

const MainLayout = lazy(() => import('./layouts/MainLayout'));
const ProfileLayout = lazy(() => import('./layouts/ProfileLayout'));
const Home = lazy(() => import('./pages/index'));
const Shop = lazy(() => import('./pages/Shop'));
const Auth = lazy(() => import('./pages/Auth'));
const ViewCart = lazy(() => import('./pages/ViewCart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Signin = lazy(() => import('./pages/Signin'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Profile = lazy(() => import('./pages/account/Index'));
const Wishlist = lazy(() => import('./pages/account/Wishlist'));
const MyOrder = lazy(() => import('./pages/account/order'));
const MyOrderDetail = lazy(() => import('./pages/account/order/[id]'));
const Address = lazy(() => import('./pages/account/address/Address'));
const AddressEdit = lazy(() => import('./pages/account/address/AddressEdit'));
const CompleteOrder = lazy(() => import('./pages/CompleteOrder'));

const routers = [
    {
        element: <MainLayout />,
        path: '/',
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: path.CategoryHome,
                element: <Home />,
            },
            {
                path: path.Shop,
                element: <Shop />,
            },
            {
                path: path.Category,
                element: <Shop />,
            },
            {
                path: path.Auth,
                element: <Auth />,
            },
            {
                path: path.Signin,
                element: <Signin />,
            },
            {
                path: path.ViewCart,
                element: <ViewCart />,
            },
            {
                path: path.Checkout,
                element: <Checkout />,
            },
            {
                path: path.ProductDetail,
                element: <ProductDetail />,
            },
            {
                path: path.CompleteOrder,
                element: <CompleteOrder />,
            },
            {
                path: path.Account.Profile,
                element: <ProfileLayout />,
                children: [
                    {
                        index: true,
                        element: <Profile />,
                    },
                    {
                        path: path.Account.Wishlist,
                        element: <Wishlist />,
                    },
                    {
                        path: path.Account.MyOrder,
                        element: <MyOrder />,
                    },
                    {
                        path: path.Account.MyOrderDetail,
                        element: <MyOrderDetail />,
                    },
                    {
                        path: path.Account.Address,
                        element: <Address />,
                    },
                    {
                        path: path.Account.AddressEdit,
                        element: <AddressEdit />,
                    },
                ],
            },
            {
                path: '*',
                element: <Page404 />,
            },
        ],
    },
];

export default routers;
