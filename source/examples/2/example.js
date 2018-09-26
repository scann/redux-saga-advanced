/**
 * В саге-генераторе можно вызывать методы в явном виде, без использования эффектов.
 * Можно также комбинировать эффекты с явными операциями без эффектов.
 *
 * Однако предпочтительней использовать эффекты всегда.
 * Это улучшаем тестируемость саги-генератора,
 * явность происходящего в ней а также консистентность написаемого кода.
 */

// Core
import { take, put } from 'redux-saga/effects';

// Instruments
import { types } from '../../bus/swapi/types';
import { swapiActions } from '../../bus/swapi/actions';
import { api } from '../../API';

export function* runExample() {
    while (true) {
        const action = yield take(types.FETCH_VEHICLES_ASYNC);

        const response = yield api.fetchVehicles(action.payload);
        const data = yield response.json();

        yield put(swapiActions.fillVehicles(data.results));
    }
}
