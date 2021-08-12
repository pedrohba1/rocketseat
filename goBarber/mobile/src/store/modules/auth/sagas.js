import { Alert } from 'react-native';

import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, SignFailure } from './actions';

export function* SignIn({ payload }) {
    try {
        const { email, password } = payload;

        const response = yield call(api.post, 'sessions', {
            email,
            password,
        });

        const { token, user } = response.data;

        if (user.provider) {
            Alert.alert(
                'erro no login',
                'usuário não pode ser prestador de serviço'
            );
            yield put(SignFailure());
            return;
        }

        api.defaults.headers.Authorization = `Bearer ${token}`;

        yield put(signInSuccess(token, user));

        /*         history.push('/dashboard');
         */
    } catch (err) {
        Alert.alert(
            'falha na autenticação',
            'houve um erro no login, verifique seus dados'
        );

        yield put(SignFailure());
    }
}

export function* signUp({ payload }) {
    try {
        const { name, email, password } = payload;

        yield call(api.post, 'users', {
            name,
            email,
            password,
        });

        /*         history.push('/');
         */
    } catch (err) {
        Alert.alert('falha no cadastro', 'verifique seus dados');

        yield put(SignFailure());
    }
}

export function setToken({ payload }) {
    if (!payload) return;
    const { token } = payload.auth;
    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', SignIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
