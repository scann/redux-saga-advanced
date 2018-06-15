/**
 * Эффект takeEvery — утилита-надстройка над take.
 * Не блокирует поток.
 * Похож на комбинацию take + fork.
 * В каком-то смысле похож на redux-thunk.
 */

// Core
import { takeEvery, put, call, apply } from 'redux-saga/effects';

// Instruments
import { types } from '../../bus/swapi/types';
import { swapiActions } from '../../bus/swapi/actions';
import { api } from '../../REST';

function* fetchVehicles (action) {
    const response = yield call(api.fetchVehicles, action.payload);
    const data = yield apply(response, response.json);

    yield put(swapiActions.fillVehicles(data.results));
}

export function* runExample () {
    yield takeEvery(types.FETCH_VEHICLES_ASYNC, fetchVehicles);
}
