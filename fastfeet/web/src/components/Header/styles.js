import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    background-color: #ffffff;
    padding: 0 30px;
`;

export const Content = styled.div`
    img {
        width: 250px;
        height: auto;
        padding-right: 15px;
        border-right: 1px solid #dddddd;
    }

    justify-content: space-between;
    height: 64px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Left = styled.div`
    display: flex;
`;

export const Option = styled.div`
    strong {
        border-bottom: ${props =>
            props.isSelected ? `2px solid ${darken(1, '#444444')}` : 'none'};
        color: ${props => props.isSelected && darken(1, '#444444')};
    }

    font-size: 20px;
    border: 0;
    background: none;
    &:first-of-type {
        padding-left: 5px;
    }

    &:hover {
        color: ${darken(1, '#444444')};
        cursor: pointer;
    }

    display: flex;
    color: #444444;
    margin: 10px;
`;

export const Right = styled.div`
    strong:first-of-type {
        color: #666666;
    }

    strong {
        padding: 5px;
    }

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Logout = styled.button`
    color: #de3b3b;
    border: 0;
    outline: 0;
    background: none;

    &:hover {
        cursor: pointer;
        color: ${darken(0.1, '#de3b3b')};
    }
`;
