export function signInRequest(id) {
    return {
        type: '@auth/SIGN_IN_REQUEST',
        payload: {
            id,
        },
    };
}

export function signInSuccess(user) {
    return {
        type: '@auth/SIGN_IN_SUCCESS',
        payload: {
            user,
        },
    };
}

export function SignFailure() {
    return {
        type: '@auth/SIGN_FAILURE',
    };
}

export function SignOut() {
    return {
        type: '@auth/SIGN_OUT',
    };
}
