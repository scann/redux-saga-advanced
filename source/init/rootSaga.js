// Core
import { all, call } from 'redux-saga/effects';

// Instruments
import { runExample } from '../examples/1';

export function* rootSaga() {
    yield all([ call(runExample) ]);
}
