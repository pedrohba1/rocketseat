import React from 'react';
import { Container, NoProducts, WarnText } from './styles';

export default function EmptyCart() {
    return (
        <Container>
            <NoProducts />
            <WarnText>Carrinho vazio</WarnText>
        </Container>
    );
}
