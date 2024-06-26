import { message } from 'antd';
import { useSearchParams } from 'react-router-dom';
import Paginate from '~/components/Paginate';
import WishlistItem from '~/components/WishlistItem';
import LoadingCard from '~/components/loading/LoadingCard';
import { useQuery } from '~/core';
import { productService } from '~/services/product.service';

function Wishlist() {
    const [searchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1');
    const { data, paginate, loading, excute } = useQuery(
        () => productService.getwishlist(`?limit=6&page=${currentPage}`),
        [currentPage],
    );

    const onRemoveWishlist = (id) => async (e) => {
        const res = await productService.removeWishlist(id);
        if (res.deleteCount) {
            message.success(`Xóa thành công`);
            excute();
        }
    };

    const noData = () => {
        if (data.length === 0) return <h6>Chưa có sản phẩm yêu thích</h6>;
    };

    return (
        <>
            <div className="row">
                {loading
                    ? [...Array(3)].map((item, i) => <LoadingCard key={i} />)
                    : data?.map((item) => (
                          <WishlistItem
                              key={item.id}
                              {...item}
                              currentPage={currentPage}
                              onRemoveWishlist={onRemoveWishlist(item.id)}
                          />
                      ))}
            </div>
            {!loading && noData()}
            <Paginate totalPage={paginate.totalPage} />
        </>
    );
}

export default Wishlist;
