/**
 * Основная концепция инструкций в redux-saga — это эффекты.
 * Эффект — это JavaScript объект, описывающий инструкцию.
 * take, call, put, apply и др. — это фабрики, производящие эффекты для разных целей.
 *
 * Сага-генератор передает эффект (или результат выражения справа от yield) middleware-у,
 * который и выполняет основную логику, описанную эффектом (или выражением).
 * После выполнения операции middleware «пробрасывает» результат обратно внутрь генератора.
 */

// Core
import { take, call, apply, put } from 'redux-saga/effects';

// Instruments
import { types } from '../../bus/swapi/types';
import { swapiActions } from '../../bus/swapi/actions';
import { api } from '../../API';

export function* runExample() {
    let page = 1;

    while (true) {
        yield take(types.FETCH_VEHICLES_ASYNC);

        const response = yield call(api.fetchVehicles, [ page ]);
        const data = yield apply(response, response.json);

        yield put(swapiActions.fillVehicles(data.results));

        page === 4 ? page = 1 : page += 1;
    }
}
