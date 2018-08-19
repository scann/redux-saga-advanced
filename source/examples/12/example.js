/**
 * redux-saga также предоставляет возможность имплементировать очередь выполнения эффектов.
 */

// Core
import { take, call, actionChannel } from 'redux-saga/effects';

// Instruments
import { types } from '../../bus/swapi/types';

// Workers
import { fetchVehicles } from './fetchVehicles';
import { fetchPeople } from './fetchPeople';
import { fetchPlanets } from './fetchPlanets';

export function* runExample () {
    const buffer = yield actionChannel([
        types.FETCH_ALL,
        types.FETCH_VEHICLES_ASYNC
    ]);

    while (true) {
        const action = yield take(buffer);

        if (action.type === types.FETCH_VEHICLES_ASYNC) {
            yield call(fetchVehicles, action);

            continue;
        }

        yield call(fetchPlanets, action);
        yield call(fetchVehicles, action);
        yield call(fetchPeople, action);
    }
}
