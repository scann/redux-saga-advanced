/**
 * Существуют блокирующие и неблокирующие эффекты.
 * Например, take — блокирующий эффект.
 * Достигнув эффекта take генератор заморозится до тех пор,
 * пока не произойдет dispatch экшена с ожидаемым паттерном.
 *
 * call тоже блокирует поток выполнения генератора в том случае, если ему
 * возвращается промис.
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

        const data = yield call(fetchVehicles, action);
        console.log('-> 5');

        yield put(swapiActions.fillVehicles(data.results));
    }
}
