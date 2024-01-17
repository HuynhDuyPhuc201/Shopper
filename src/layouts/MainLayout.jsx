import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchDrawer from '../components/SearchDrawer';
import CartDrawer from '../components/CartDrawer';

function MainLayout() {
    return (
        <>
            <Header />
            <CartDrawer />
            <SearchDrawer />
            <Outlet />
            <Footer />
        </>
    );
}

export default MainLayout;
