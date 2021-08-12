import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    margin: auto;
    max-width: 1200px;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Buttons = styled.div`
    display: flex;
    flex-direction: row;
`;

export const BackButton = styled.button`
    display: flex;
    height: 36px;
    vertical-align: middle;
    margin-right: 10px;
    span {
        display: flex;
        align-self: center;
    }

    &:hover {
        background: ${darken(0.1, '#CCCCCC')};
    }

    color: #ffffff;
    background: #cccccc;
    border: 0;
    padding: 0 10px;
    font-weight: bold;
    border-radius: 4px;
`;

export const FormContainer = styled.div`
    background: #ffffff;
    border-radius: 4px;
    padding: 30px;
`;

export const InputContainer = styled.div`
    width: ${props => props.width};
    padding: 10px;
    input {
        padding: 0 15px;
        height: 45px;
        border-radius: 4px;
        border: 1px solid #dddddd;
        display: flex;
        width: 100%;
    }
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

export const InputLabel = styled.h4`
    color: #444;
    font-weight: bold;
`;
