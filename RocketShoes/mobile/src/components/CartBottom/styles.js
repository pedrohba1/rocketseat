import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import colors from '../../styles/colors';

export const Container = styled.View`
    background-color: ${colors.white};
    margin: 0 20px;
    border-radius: 2px;
`;

export const TotalText = styled.Text`
    color: gray;
    align-self: center;
    margin: 15px 0;
    font-size: 25px;
`;

export const TotalPrice = styled.Text`
    font-weight: bold;
    align-self: center;
    font-size: 40px;
    color: ${colors.fontDark};
`;

export const BuyButton = styled(RectButton)`
    background: ${colors.primary};
    align-items: center;
    padding: 10px;
    margin: 10px 20px;
    border-radius: 2px;
`;

export const BuyButtonText = styled.Text`
    color: ${colors.white};
    font-weight: bold;
    font-size: 20px;
`;
