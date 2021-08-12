import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, ShoppingList } from './styles';
import * as CartActions from '../../store/modules/cart/actions';
import formatPrice from '../../utils/format';

import CartItem from '../../components/CartItem';
import CartBottom from '../../components/CartBottom';
import EmptyCart from '../../components/EmptyCart';

export default function Cart() {
    const cart = useSelector(state =>
        state.cart.map(product => ({
            ...product,
            subtotal: `R$ ${formatPrice(product.price * product.amount)}`,
        }))
    );

    const dispatch = useDispatch();

    const total = useSelector(state =>
        formatPrice(
            state.cart.reduce((sumTotal, product) => {
                return sumTotal + product.price * product.amount;
            }, 0)
        )
    );

    const cartSize = useSelector(state => state.cart.length);

    function handleDelete(product) {
        dispatch(CartActions.removeFromCart(product));
    }

    function handleIncrement(product) {
        dispatch(CartActions.updateAmountRequest(product, product.amount + 1));
    }

    function handleDecrement(product) {
        dispatch(CartActions.updateAmountRequest(product, product.amount - 1));
    }

    console.tron.log(cart);
    return (
        <Container>
            <ShoppingList
                data={cart}
                renderItem={product => (
                    <CartItem
                        product={product.item}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                        onDelete={handleDelete}
                        subtotal={product.item.subtotal}
                    />
                )}
                keyExtractor={product => String(product.id)}
                ListEmptyComponent={<EmptyCart />}
            />
            {cartSize > 0 ? <CartBottom products={cart} total={total} /> : null}
        </Container>
    );
}
