import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const ProblemInput = styled.TextInput``;

export const Background = styled.View`
    flex: 1;
    background: #fff;
    padding: 0 8px;
`;

export const Container = styled.View`
    background: #fff;
    min-height: 60%;
    padding: 8px;
    display: flex;
    align-self: stretch;
    border-width: 0.5px;
    border-radius: 0.5px;
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

export const Button = styled(RectButton)`
    margin-top: 5px;
    height: 46px;
    background: #7d40e7;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
`;

export const BText = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 16px;
`;
