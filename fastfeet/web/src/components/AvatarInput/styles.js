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
