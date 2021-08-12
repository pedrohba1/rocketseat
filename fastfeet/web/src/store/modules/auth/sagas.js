import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';
import { changeTab } from '~/store/modules/user/actions';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        const response = yield call(api.post, 'sessions', { email, password });
        const { token, user } = response.data;

        api.defaults.headers.Authorization = `Bearer ${token}`;

        yield put(signInSuccess(token, user));
        yield put(changeTab('couriers'));
    } catch (err) {
        toast.error('Falha na autenticação. Verifique seus dados');
        yield put(signFailure());
    }
}

export function setToken({ payload }) {
    if (!payload) return;
    const { token } = payload.auth;
    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export function* signOut() {
    yield put(changeTab(''));
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_OUT', signOut),
]);
