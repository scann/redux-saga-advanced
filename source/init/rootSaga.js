// Core
import { all } from 'redux-saga/effects';

// Instruments
import { runExample } from '../examples/1';

export function* rootSaga() {
    yield all([ runExample() ]);
}
