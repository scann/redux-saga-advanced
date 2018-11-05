/**
 * Например — процесс можно отменить с помощью эффекта cancel.
 */

// Core
import {
    take,
    put,
    call,
    apply,
    fork,
    cancel,
    cancelled,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';

// Instruments
import { types } from '../../bus/swapi/types';
import { swapiActions } from '../../bus/swapi/actions';
import { api } from '../../API';

function* fetchVehicles(action) {
    try {
        yield delay(2000);

        const response = yield call(api.fetchVehicles, action.payload);
        const data = yield apply(response, response.json);

        yield put(swapiActions.fillVehicles(data.results));
    } catch (error) {
        console.log('→ error', error);
    } finally {
        if (yield cancelled()) {
            console.log('→ cancelled!', action.type);
        }
    }
}

export function* runExample() {
    let tasks = [];

    while (true) {
        const action = yield take([
            types.FETCH_VEHICLES_ASYNC,
            types.CANCEL_FETCH,
        ]);

        if (tasks.length && action.type === types.CANCEL_FETCH) {
            for (const task of tasks) {
                yield cancel(task);
            }
            tasks = [];

            continue;
        }

        const task = yield fork(fetchVehicles, action);

        tasks.push(task);

        console.log('→ tasks', tasks);
    }
}
