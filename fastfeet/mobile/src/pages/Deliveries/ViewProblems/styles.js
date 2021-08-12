import styled from 'styled-components/native';

export const Background = styled.View`
    background: #fff;
    flex: 1;
`;

export const List = styled.FlatList.attrs({
    showVerticalScrollIndicator: false,
})``;

export const HorizontalContainer = styled.View`
    padding: 8px;
    justify-content: center;
    display: flex;
    flex-direction: row;
    align-self: stretch;
`;

export const HText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #7d40e7;
`;
