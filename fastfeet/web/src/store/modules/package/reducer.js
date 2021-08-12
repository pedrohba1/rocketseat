import produce from 'immer';

const INITIAL_STATE = {
    data: null,
};

export default function pack(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@package/EDIT_REQUEST': {
                draft.data = action.payload.pack;
                break;
            }
            default:
        }
    });
}
