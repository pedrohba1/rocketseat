import produce from 'immer';

export default function cart(state = [], action) {
    switch (action.type) {
        case '@cart/ADD_SUCCESS':
            return produce(state, draft => {
                const { product } = action;
                draft.push(product);
            });

        case '@cart/REMOVE':
            return produce(state, draft => {
                const productIndex = draft.findIndex(p => p.id === action.id);
                if (productIndex >= 0) {
                    draft.splice(productIndex, 1);
                }
            });

        case '@cart/UPDATE_AMOUNT_SUCCESS':
            return produce(state, draft => {
                const productIndex = draft.findIndex(p => p.id === action.id);
                if (productIndex >= 0) {
                    draft[productIndex].amount = Number(action.amount);
                }
            });

        default:
            return state;
    }
}

// todos os reducers ouvem todas as actions. é por isso que precisa fazer o switch case
//  o campo dispatch leva uma função que manda em action tudo que foi passado no objeto dispatch.

// o componente dispara uma action
// a action avisa o reducer
// o reducer faz as alterações que ele precisa
// o redux avisa todos os componentes que precisam daquela informação para que eles se atualizem.
