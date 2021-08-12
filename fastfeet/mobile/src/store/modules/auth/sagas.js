import { Alert } from 'react-native';

import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, SignFailure } from './actions';

export function* SignIn({ payload }) {
    try {
        const { id: userId } = payload;
        const response = yield call(api.get, `/couriers/${userId}`);
        const { id, name, email, avatar, createdAt } = response.data;
        const user = {
            id,
            name,
            email,
            avatar,
            createdAt,
        };
        yield put(signInSuccess(user));
    } catch (err) {
        Alert.alert('falha na autenticação', 'houve um erro no login');
        yield put(SignFailure());
    }
}

export function* setId({ payload }) {
    if (!payload) return;
    const { id } = payload.auth;
    if (id) {
        yield put(signInSuccess(id));
    }
}

export default all([
    takeLatest('persist/REHYDRATE', setId),
    takeLatest('@auth/SIGN_IN_REQUEST', SignIn),
]);
