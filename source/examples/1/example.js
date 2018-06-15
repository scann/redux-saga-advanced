/**
 * Основная концепция инструкций в redux-saga — это эффекты.
 * Эффект — это JavaScript объект, описывающий инструкцию.
 * take, call, put, apply — это фабрики, производящие эффекты для разных целей.
 *
 * Под капотом сага-генератор предает эффект (или результат выражения справа от yield) middleware-у,
 * который и выполняет основную логику, описанную эффектом (или выражением).
 * После выполнения операции — middleware «пробрасывает» результат обратно внутрь генератора.
 */

// Core
import { take, call, put, apply } from 'redux-saga/effects';

// Instruments
import { types } from '../../bus/swapi/types';
import { swapiActions } from '../../bus/swapi/actions';
import { api } from '../../REST';

export function* runExample () {
    let page = 1;

    while (true) {
        yield take(types.FETCH_VEHICLES_ASYNC);

        const response = yield call(api.fetchVehicles, String(page));
        const data = yield apply(response, response.json);

        yield put(swapiActions.fillVehicles(data.results));

        page === 4 ? page = 1 : page += 1;
    }
}
