import React from 'react';
import {Switch, Route} from 'react-router-dom';

import List from './list';
import Form from './form';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/add' component={Form} />
        <Route path='/:hash' component={Form} />
        <Route path='/' component={List} />
      </Switch>
    );
  }
}

export default App;
