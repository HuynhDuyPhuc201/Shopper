import { Link, useLocation, useSearchParams } from 'react-router-dom';

function Paginate({ totalPage }) {
    const [searchParams] = useSearchParams();

    const currentPage = parseInt(searchParams.get('page') || '1');
    // const search = searchParams.set('search');
    const { pathname, search } = useLocation();

    let start = currentPage - 2;
    let end = currentPage + 2;
    const renderPage = () => {
        const list = [];
        if (start < 1) {
            start = 1;
            end = 5;
        }

        if (end > totalPage) {
            end = totalPage;
            start = end - 4;

            if (start < 1) {
                start = 1;
            }
        }

        for (let i = start; i <= end; i++) {
            const searchParams = new URLSearchParams(search);
            searchParams.set('page', i);

            const path = `${pathname}?${searchParams.toString()}`;
            list.push(
                <li className="page-item" key={i}>
                    <Link className="page-link" to={path}>
                        {i}
                    </Link>
                </li>,
            );
        }
        return list;
    };
    if (totalPage <= 1) return null;

    return (
        <nav className="d-flex justify-content-center justify-content-md-end">
            <ul className="pagination pagination-sm text-gray-400">
                <li className="page-item">
                    <a className="page-link page-link-arrow" to="#">
                        <i className="fa fa-caret-left" />
                    </a>
                </li>

                {renderPage()}
                {/* <li className="page-item active">
                    <a className="page-link" href="#">
                        1
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">
                        2
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">
                        3
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">
                        4
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">
                        5
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">
                        6
                    </a>
                </li> */}
                <li className="page-item">
                    <a className="page-link page-link-arrow" href="#">
                        <i className="fa fa-caret-right" />
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Paginate;
