import styled from 'styled-components';

export const colors = [
    '#A28FD0',
    '#CB946C',
    '#83CEC9',
    '#CC7584',
    '#A8D080',
    '#CCCC8B',
];

export const Container = styled.div`
    display: flex;
    border-radius: 50%;
    margin-right: 15px;
    width: 35px;
    height: 35px;
    background: #f4effc;
    align-self: center;
    justify-content: center;
    span {
        color: ${props => props.color};
    }
`;

export const Img = styled.img`
    border-radius: 50%;
    width: 35px;
    height: 35px;
`;

export const Default = styled.div`
    display: flex;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    background: #f4effc;
    align-self: center;
    justify-content: center;
    span {
        color: ${props => props.color};
    }
`;
