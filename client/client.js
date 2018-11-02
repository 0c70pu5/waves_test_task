import './theme';
import React from 'react';
import {hydrate} from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

import {configureStore, history} from './store';
import Root from 'layers/root';
import loDebounce from 'lodash/debounce';

const {NODE_ENV} = process.env;

class Client extends React.Component {

  constructor(...props) {
    super(...props);

    const initialState = window.__INITIAL_STATE__ ? JSON.parse(window.__INITIAL_STATE__) : {};
    this.store = configureStore(initialState);

    this.Root = Root;

    if (NODE_ENV === 'development') {
      if (module.hot) {
        let PrevRoot = Root;

        const update = loDebounce(() => {
          const NextRoot = require('./layers/root').default;
          try {
            this.Root = NextRoot;
            this.forceUpdate();
            PrevRoot = NextRoot;
          } catch (e) {
            console.error(e);
            console.info('The application will be restored to its last stable state');
            this.Root = PrevRoot;
            this.forceUpdate();
          }
        }, 150);

        module.hot.accept('./layers/root', update);
      }
    }
  }

  render() {
    const {Root, store} = this;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Root {...this.props} />
        </ConnectedRouter>
      </Provider>
    );
  }
}

const init = () =>
  hydrate(<Client/>, document.getElementById('app'));

export {
  init,
  configureStore,
  Root,
  Client
};
export {default as Html} from './html';
