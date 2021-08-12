import produce from 'immer';

const INITIAL_STATE = {
    data: null,
};

export default function courier(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@courier/EDIT_REQUEST': {
                draft.data = action.payload.courier;
                break;
            }
            default:
        }
    });
}
