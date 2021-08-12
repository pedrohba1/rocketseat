import styled from 'styled-components/native';

export const Background = styled.SafeAreaView`
    padding: 20px;
    background: #fff;
    flex: 1;
    display: flex;
    align-self: stretch;
    flex-direction: column;
    justify-content: space-evenly;
`;

export const Bottom = styled.View``;

export const TextContainer = styled.View`
    margin: 10px 0;
`;

export const Label = styled.Text`
    font-size: 15px;
    color: #666666;
`;

export const Content = styled.Text`
    color: #444444;
    font-size: 20px;
    font-weight: bold;
`;
