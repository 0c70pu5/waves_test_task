import React from 'react';
import {Switch, Route} from 'react-router-dom';
import App from './app';

class Root extends React.Component {
  render() {
    return (
      <div className='layout'>
        <Switch>
          <Route
            path='/'
            component={App}
          />
        </Switch>
      </div>
    );
  }
}

export default Root;

