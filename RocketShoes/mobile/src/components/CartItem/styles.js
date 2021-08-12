import styled from 'styled-components/native';
import { Icon } from 'react-native-elements';
import colors from '../../styles/colors';

export const Container = styled.View`
    background-color: ${colors.white};
    margin: 0 20px;
    border-radius: 2px;
    flex-direction: column;
`;

export const ProductImage = styled.Image.attrs({
    resizeMode: 'contain',
})`
    width: 100%;
    height: 100px;
    flex: 2;
    align-self: center;
    width: 100%;
`;

export const ProductContainer = styled.View`
    padding: 10px 20px;
    flex-direction: row;
`;

export const ProductTextContainer = styled.View`
    flex: 4;
`;

export const ProductName = styled.Text`
    flex: 8;
    font-size: 20px;
    color: ${colors.fontDark};
`;

export const ProductPrice = styled.Text`
    flex: 8;
    font-weight: bold;
    font-size: 20px;
    color: ${colors.fontDark};
`;

export const TrashIcon = styled(Icon).attrs({
    name: 'delete-forever',
    color: colors.primary,
    size: 36,
})``;

export const DeleteButton = styled.TouchableOpacity`
    align-self: center;
`;

export const ProductAmountContainer = styled.View`
    background: ${colors.gray};
    flex-direction: row;
    padding: 5px 20px;
`;

export const IncreaseButton = styled.TouchableOpacity`
    align-self: center;
`;

export const DecreaseButton = styled.TouchableOpacity`
    align-self: center;
`;

export const IncreaseIcon = styled(Icon).attrs({
    name: 'add-circle-outline',
    color: colors.primary,
    size: 25,
})``;

export const DecreaseIcon = styled(Icon).attrs({
    name: 'remove-circle-outline',
    color: colors.primary,
    size: 25,
})``;

export const AmountInput = styled.TextInput.attrs({
    editable: false,
})`
    color: ${colors.fontDark};
    background: #fff;
    padding: 3px;
    margin: 0 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-width: 52px;
`;

export const SubtotalText = styled.Text`
    flex: 1;
    font-size: 20px;
    color: ${colors.fontDark};
    font-weight: bold;
    text-align: right;
    align-self: center;
`;
