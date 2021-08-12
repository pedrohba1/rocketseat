import styled from 'styled-components/native';

export const Container = styled.View`
    display: flex;
    border-radius: ${props => `${props.size / 2}px`};
    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
    background: #f4effc;
    align-self: center;
    justify-content: center;
`;

export const Img = styled.Image`
    border-radius: ${props => `${props.size / 2}px`};
    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
`;

export const Name = styled.Text`
    font-size: ${props => `${props.size / 2}px`};
    align-self: center;
    color: #a28fd0;
`;
