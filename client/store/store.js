import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware, connectRouter} from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducer/root';

export let history = {};

export function configureStore(initialState = {}) {
  const middlewares = [
    thunk
  ];

  let composeEnhancers = compose;

  if (global.IS_BROWSER) {
    history = createHistory();
    middlewares.push(routerMiddleware(history));
  }

  if (process.env.NODE_ENV === 'development') {
    if (global.IS_BROWSER) {
      if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
      }
    }
  }

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (process.env.NODE_ENV === 'development') {
    if (global.IS_BROWSER) {
      if (module.hot) {
        module.hot.accept('./reducer/root', () => {
          const nextReducer = require('./reducer/root').default;
          store.replaceReducer(nextReducer);
        });
      }
    }
  }

  return store;
}
