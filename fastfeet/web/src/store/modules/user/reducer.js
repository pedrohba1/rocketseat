import produce from 'immer';

const INITIAL_STATE = {
    profile: null,
    tab: null,
};

export default function user(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/SIGN_IN_SUCCESS': {
                draft.profile = action.payload.user;
                break;
            }
            case '@auth/SIGN_OUT': {
                draft.profile = null;
                draft.tab = null;
                break;
            }
            case '@user/CHANGE_TAB': {
                draft.tab = action.payload.tab;
                break;
            }
            default:
        }
    });
}
