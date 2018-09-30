/**
 * Сага-генератор умеет делегировать поток выполнения другому генератору,
 * используя встроенный в JavaScript механизм делегирования — yield *.
 */

// Core
import { take, put, call, apply } from 'redux-saga/effects';

// Instruments
import { types } from '../../bus/swapi/types';
import { swapiActions } from '../../bus/swapi/actions';
import { api } from '../../API';

function* fetchVehicles(action) {
    const response = yield call(api.fetchVehicles, action.payload);
    const data = yield apply(response, response.json);

    return data;
}

export function* runExample() {
    while (true) {
        const action = yield take(types.FETCH_VEHICLES_ASYNC);

        const data = yield* fetchVehicles(action);

        yield put(swapiActions.fillVehicles(data.results));
    }
}









































