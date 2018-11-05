// Core
import { put, call, apply } from 'redux-saga/effects';
import { delay } from 'redux-saga';

// Instruments
import { swapiActions } from '../../bus/swapi/actions';
import { api } from '../../API';

export function* fetchPlanets(action) {
    yield delay(1000);

    const response = yield call(api.fetchPlanets, action.payload);
    const data = yield apply(response, response.json);

    yield put(swapiActions.fillPlanets(data.results));
}
