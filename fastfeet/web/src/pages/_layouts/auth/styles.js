import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
    height: 100%;
    background: #7d40e7;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
    background: #ffffff;
    padding: 60px 30px 60px 30px;
    width: 100%;
    max-width: 360px;
    text-align: center;

    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
    }

    h4 {
        color: #444;
        align-self: flex-start;
        font-size: 15px;
        margin: 0 0 10px;
        margin-top: 10px;
        font-weight: bold;
    }

    span {
        color: #de3b3b;
        align-self: flex-start;
        margin: 0 0 10px;
        font-weight: bold;
    }

    img {
        width: 90%;
        height: auto;
    }

    input {
        background: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 4px;
        padding: 0 15px;
        height: 44px;
        color: #444;
        margin: 0 0 5px;

        &::placeholder {
            color: #999999;
        }
    }

    button {
        margin-top: 10px;
        height: 44px;
        background: #7d40e7;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        transition: background 0.2s;
        &:hover {
            background: ${darken(0.03, '#7D40E7')};
        }
    }

    a {
        color: #fff;
        margin-top: 15px;
        font-size: 16px;
        opacity: 0.8;

        &:hover {
            opacity: 1;
        }
    }
`;
