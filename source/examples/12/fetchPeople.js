// Core
import { put, call, apply } from 'redux-saga/effects';
import { delay } from 'redux-saga';

// Instruments
import { swapiActions } from '../../bus/swapi/actions';
import { api } from '../../API';

export function* fetchPeople(action) {
    yield delay(1000);

    const response = yield call(api.fetchPeople, action.payload);
    const data = yield apply(response, response.json);

    yield put(swapiActions.fillPeople(data.results));
}
