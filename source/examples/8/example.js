/**
 * Существует ещё одна неблокирующая альтернатива fork (attached fork) — spawn (detached fork).
 *
 * Сага-генератор, возбужденная с помощью spawn — «отсоединена» от породившей
 * её родительской саги.
 *
 * Она живет в своем отдельном контексте выполнения, поэтому родительская сага
 * может быть легко убрана сборщиком мусора во время выполнения саги
 * порожденной с помощью spawn.
 *
 * Однако это так-же приводит к тому, что не обработанное исключение,
 * возбужденное в такой саге — не сможет «всплыть» к родительской саге, и быть
 * там обработанным.
 */

// Core
import { take, spawn, put, call, apply } from 'redux-saga/effects';
import { delay } from 'redux-saga';

// Instruments
import { types } from '../../bus/swapi/types';
import { swapiActions } from '../../bus/swapi/actions';
import { api } from '../../API';

function* fetchVehicles(action) {
    yield delay(3000);
    const response = yield call(api.fetchVehicles, action.payload);
    const data = yield apply(response, response.json);

    yield put(swapiActions.fillVehicles(data.results));
    throw new Error(`
        В отличии от fork, spawn не сохраняет ссылку на вызвавшую родительскую сагу-генератор.
        Вместо этого, spawn создает новый поток-ветвление от rootSaga.
        В случае с fork данная ошибка была-бы отловлена родительской сагой-генератором runExample.
    `);
}

function* spawningSaga(action) {
    yield spawn(fetchVehicles, action);
}

export function* runExample() {
    while (true) {
        try {
            const action = yield take(types.FETCH_VEHICLES_ASYNC);

            yield call(spawningSaga, action);
        } catch (error) {
            console.log('→ error', error);
        }
    }
}
