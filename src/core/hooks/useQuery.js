import { useEffect, useState } from 'react';

export const useQuery = (callbackPromise, dependencyList = []) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginate, setPaginate] = useState({});
    const [dataDetail, setDataDetail] = useState([]);
    const [error, setError] = useState('');

    // useQuery thường dùng cho load 1 dữ liệu nào đó
    // hàm excute ở đây, dùng để load dữ liệu nên set up nó trong useEffect()
    // và chỉ chạy lần đầu tiên khi component render

    useEffect(() => {
        excute();
    }, dependencyList);

    const excute = () => {
        setLoading(true);
        callbackPromise()
            .then((res) => {
                setData(res.data);
                setPaginate(res.paginate);
                setDataDetail(res);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return {
        excute,
        setData,
        data,
        loading,
        error,
        paginate,
        dataDetail,
    };
};
