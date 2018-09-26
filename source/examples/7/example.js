/**
 * Можно осуществлять даже более сложный контроль над параллельными задачами.
 */

// Core
import { take, fork, cancel } from 'redux-saga/effects';

// Instruments
import { types } from '../../bus/swapi/types';

// Workers
import { fetchVehicles } from './fetchVehicles';
import { fetchPeople } from './fetchPeople';
import { fetchPlanets } from './fetchPlanets';

export function* runExample() {
    const tasks = [];

    while (true) {
        const action = yield take([
            types.FETCH_VEHICLES_ASYNC,
            types.FETCH_ALL,
            types.CANCEL_FETCH,
        ]);

        if (tasks.length && action.type === types.CANCEL_FETCH) {
            for (let i = 0; i < tasks.length; i++) {
                yield cancel(tasks[ i ]);
            }

            continue;
        }

        if (action.type === types.FETCH_VEHICLES_ASYNC) {
            const vehiclesTask = yield fork(fetchVehicles, action);

            tasks.push(vehiclesTask);
            continue;
        }

        const vehiclesTask = yield fork(fetchVehicles, action);
        const peopleTask = yield fork(fetchPeople, action);
        const planetsTask = yield fork(fetchPlanets, action);

        tasks.push(vehiclesTask);
        tasks.push(peopleTask);
        tasks.push(planetsTask);
    }
}
