// Core
import { createStore, compose, applyMiddleware } from 'redux';

// Instruments
import { rootReducer } from './rootReducer';
import { middleware, sagaMiddleware } from './middleware';
import { rootSaga } from './rootSaga';

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = __DEV__ && devtools ? devtools : compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware)),
);

sagaMiddleware.run(rootSaga);

export { store };
