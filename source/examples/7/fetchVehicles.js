// Core
import {
    put,
    call,
    apply,
    cancelled
} from 'redux-saga/effects';
import { delay } from 'redux-saga';

// Instruments
import { swapiActions } from '../../bus/swapi/actions';
import { api } from '../../REST';

export function* fetchVehicles (action) {
    try {
        yield delay(3000);

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