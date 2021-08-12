import styled from 'styled-components';

export const Container = styled.div`
    input {
        display: none;
    }
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    label {
        cursor: pointer;

        &:hover {
            opacity: 0.7;
        }

        img {
            justify-content: center;
            display: flex;
            align-self: center;
            height: 120px;
            width: auto;
            border-radius: 4px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            background: #eee;
        }
    }
`;

export const ImageContainer = styled.div`
    display: flex;
    border-radius: 50%;
    margin-right: 15px;
    width: 150px;
    height: 150px;
    background: #f4effc;
    border-style: dashed;
    border-color: #7d40e7;
    align-self: center;
    justify-content: center;
    span {
        flex-direction: column;
        font-weight: bold;
        color: #7d40e7;
        justify-content: center;
        display: flex;
        font-size: 50px;
    }
`;
