import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../services/api';
import { ShoeList, Container } from './styles';
import ShoeItem from '../../components/ShoeItem';
import formatNumber from '../../utils/format';
import * as CartActions from '../../store/modules/cart/actions';

export default function Home() {
    const [products, setProducts] = useState([]);

    const amount = useSelector(state =>
        state.cart.reduce((sumAmount, product) => {
            sumAmount[product.id] = product.amount;
            return sumAmount;
        }, {})
    );

    const dispatch = useDispatch();

    useEffect(() => {
        async function loadProducts() {
            const res = await api.get('products');
            const data = res.data.map(product => ({
                ...product,
                // para o render não ficar atualizando múltiplas vezes, eu já coloco direto o preço formatado no objeto do produto.
                priceFormatted: formatNumber(product.price),
            }));
            setProducts(data);
        }
        loadProducts();
    }, []);

    function handleAddProduct(id, navigation) {
        dispatch(CartActions.addToCartRequest(id, navigation));
    }

    return (
        <Container>
            <ShoeList
                data={products}
                renderItem={product => (
                    <ShoeItem
                        product={product.item}
                        onAddProduct={handleAddProduct}
                        amount={amount[product.item.id]}
                    />
                )}
                keyExtractor={product => String(product.id)}
            />
        </Container>
    );
}
