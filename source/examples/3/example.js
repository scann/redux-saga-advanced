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
    console.log('-> 2');
    const response = yield call(api.fetchVehicles, action.payload);

    console.log('-> 3');
    const data = yield apply(response, response.json);

    console.log('-> 4');

    return data;
}

export function* runExample() {
    while (true) {
        const action = yield take(types.FETCH_VEHICLES_ASYNC);

        console.log('-> 1');
        const data = yield* fetchVehicles(action);

        console.log('-> 5');
        yield put(swapiActions.fillVehicles(data.results));
    }
}
