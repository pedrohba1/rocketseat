import { takeLatest, all } from 'redux-saga/effects';
import history from '~/services/history';

export function changeTab({ payload }) {
    const { tab } = payload;
    history.push(`/${tab}`);
}

export default all([takeLatest('@user/CHANGE_TAB', changeTab)]);
