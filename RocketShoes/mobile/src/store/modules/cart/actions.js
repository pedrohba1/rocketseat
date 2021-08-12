// actions iniciando com o nome do módulo

export function addToCartRequest(id, navigation) {
    return {
        type: '@cart/ADD_TO_CART_REQUEST',
        id,
        navigation,
    };
}

export function addToCartSuccess(product) {
    return {
        type: '@cart/ADD_TO_CART_SUCCESS',
        product,
    };
}

export function removeFromCart(product) {
    return {
        type: '@cart/REMOVE_FROM_CART',
        product,
    };
}

export function updateAmountRequest(product, amount) {
    return {
        type: '@cart/UPDATE_AMOUNT_REQUEST',
        product,
        amount,
    };
}

export function updateAmountSuccess(product, amount) {
    return {
        type: '@cart/UPDATE_AMOUNT_SUCCESS',
        product,
        amount,
    };
}
