import React from 'react';
import styled from 'styled-components';

const ButtonQuantity = styled.button`
    width: 40px;
    height: 40px;
    border: none;
    background: none;
    &:focus {
        outline: none;
        box-shadow: none;
    }
    &:disabled {
        cursor: no-drop;
    }
`;

const InputQuantityRoot = styled.input`
    width: 40px;
    height: 40px;
    text-align: center;
    out-line: none;
`;
const QuantityRoot = styled.div`
    display: flex;
`;

function InputQuantity({ value, onIncrement, onDecrement, loading }) {
    return (
        <QuantityRoot>
            <ButtonQuantity disabled={loading} onClick={onDecrement}>
                -
            </ButtonQuantity>
            <InputQuantityRoot value={value} type="text" readOnly />
            <ButtonQuantity disabled={loading} onClick={onIncrement}>
                +
            </ButtonQuantity>
        </QuantityRoot>
    );
}

export default InputQuantity;
