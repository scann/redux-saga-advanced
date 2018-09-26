/**
 * Эффект takeLatest — не блокирует поток, и похож на take + fork.
 *
 * Однако при попытке начать новый task до завершения предыдущего — предыдущий
 * отменяет с помощью cancel. То есть до конца единовременно выполнится лишь
 * task, запущенный последним dispatched redux action.
 */

// Core
import { takeLatest, put, call, apply } from 'redux-saga/effects';
import { delay } from 'redux-saga';

// Instruments
import { types } from '../../bus/swapi/types';
import { swapiActions } from '../../bus/swapi/actions';
import { api } from '../../API';

function* fetchVehicles(action) {
    yield delay(1000);

    const response = yield call(api.fetchVehicles, action.payload);
    const data = yield apply(response, response.json);

    yield put(swapiActions.fillVehicles(data.results));
}

export function* runExample() {
    yield takeLatest(types.FETCH_VEHICLES_ASYNC, fetchVehicles);
}
