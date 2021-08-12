import styled from 'styled-components/native';

export const Background = styled.SafeAreaView`
    background: #fff;

    flex: 1;
`;

export const TextContainer = styled.View`
    margin: 5px 0;
`;

export const HTextContainer = styled.View`
    margin: 5px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Container = styled.View`
    background: #fff;
    padding: 8px;
    display: flex;
    align-self: stretch;
    border-width: 0.5px;
    border-radius: 4px;
    border-color: #ddd;
    border-bottom-width: 0;
    shadow-color: #000;
    shadow-opacity: 0.5;
    shadow-radius: 4px;
    elevation: 1;
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 10px;
`;

export const Buttons = styled.View`
    align-self: center;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

export const HorizontalContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-self: stretch;
`;

export const HText = styled.Text`
    margin-left: 5px;
    font-weight: bold;
    color: #7d40e7;
`;

export const LabelText = styled.Text`
    color: #999999;
    font-weight: bold;
`;

export const ContentText = styled.Text`
    color: #666666;
`;

export const ButtonText = styled.Text`
    color: #666666;
    text-align: center;
`;

export const Button = styled.TouchableOpacity`
    text-align: center;
    align-self: center;
    align-items: center;
    display: flex;
    align-self: stretch;
    flex-direction: column;
`;
