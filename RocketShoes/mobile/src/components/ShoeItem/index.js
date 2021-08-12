import React from 'react';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import {
    Container,
    ProductImage,
    ProductName,
    ProductPrice,
    AddButton,
    ButtonText,
    ButtonAmountText,
    ButtonAmount,
} from './styles';

function ShoeItem({ product, onAddProduct, amount }) {
    const navigation = useNavigation();

    return (
        <Container>
            <ProductImage source={{ uri: product.image }} />
            <ProductName> {product.title}</ProductName>
            <ProductPrice>R$ {product.priceFormatted}</ProductPrice>
            <AddButton onPress={() => onAddProduct(product.id, navigation)}>
                <ButtonAmount>
                    <Icon name="add-shopping-cart" color="#fff" size={24} />
                    <ButtonAmountText>{amount}</ButtonAmountText>
                </ButtonAmount>
                <ButtonText>Adicionar ao carrinho</ButtonText>
            </AddButton>
        </Container>
    );
}

ShoeItem.defaultProps = {
    amount: 0,
};

ShoeItem.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        priceFormatted: PropTypes.string,
    }).isRequired,
    onAddProduct: PropTypes.func.isRequired,
    amount: PropTypes.number,
};

export default ShoeItem;
