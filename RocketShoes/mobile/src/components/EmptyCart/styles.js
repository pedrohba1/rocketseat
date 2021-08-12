import styled from 'styled-components/native';
import { Icon } from 'react-native-elements';
import colors from '../../styles/colors';

export const Container = styled.View`
    background: ${colors.white};
    margin: 0 20px;
    border-radius: 2px;
    flex-direction: column;
`;

export const NoProducts = styled(Icon).attrs({
    name: 'remove-shopping-cart',
    color: colors.fontDark,
    size: 60,
})``;

export const WarnText = styled.Text`
    color: ${colors.fontDark};
    font-weight: bold;
    text-align: center;
    font-size: 30px;
`;
