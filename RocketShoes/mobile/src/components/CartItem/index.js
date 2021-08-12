import React from 'react';
import PropTypes from 'prop-types';

import {
    Container,
    ProductPrice,
    ProductContainer,
    ProductTextContainer,
    ProductName,
    ProductImage,
    TrashIcon,
    DeleteButton,
    ProductAmountContainer,
    IncreaseButton,
    DecreaseButton,
    IncreaseIcon,
    DecreaseIcon,
    AmountInput,
    SubtotalText,
} from './styles';

export default function CartItem({
    product,
    onDelete,
    onIncrement,
    onDecrement,
    subtotal,
}) {
    return (
        <Container>
            <ProductContainer>
                <ProductImage source={{ uri: product.image }} />
                <ProductTextContainer>
                    <ProductName>{product.title}</ProductName>
                    <ProductPrice>R$ {product.priceFormatted}</ProductPrice>
                </ProductTextContainer>
                <DeleteButton onPress={() => onDelete(product)}>
                    <TrashIcon />
                </DeleteButton>
            </ProductContainer>
            <ProductAmountContainer>
                <DecreaseButton onPress={() => onDecrement(product)}>
                    <DecreaseIcon />
                </DecreaseButton>
                <AmountInput> {product.amount}</AmountInput>
                <IncreaseButton onPress={() => onIncrement(product)}>
                    <IncreaseIcon />
                </IncreaseButton>
                <SubtotalText>{subtotal}</SubtotalText>
            </ProductAmountContainer>
        </Container>
    );
}

CartItem.propTypes = {
    product: PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string,
        priceFormatted: PropTypes.string,
        amount: PropTypes.number,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
    subtotal: PropTypes.string.isRequired,
};
