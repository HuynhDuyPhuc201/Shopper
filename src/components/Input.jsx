import { useId } from 'react';
import styled from 'styled-components';

const Error = styled.p`
    color: red;
`;

function Input({ error, label, type = 'text', placeholder, ...porps }) {
    const id = useId();

    return (
        <>
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <input
                    className="form-control form-control-sm"
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    {...porps}
                />
                {error && <Error>{error}</Error>}
            </div>
        </>
    );
}

export default Input;
