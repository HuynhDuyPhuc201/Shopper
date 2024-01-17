import { LoadingOutlined } from '@ant-design/icons';

function Button({ children, loading, onClick }) {
    return (
        <button disabled={loading} className="btn btn-sm btn-dark" type="submit" onClick={onClick}>
            {loading && <LoadingOutlined />}
            {children}
        </button>
    );
}

export default Button;
