import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import LayoutDefault from './layouts/LayoutDefault';

function AppNavigator(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home" component={LayoutDefault} />
          <Route path="/shipments" component={LayoutDefault} />
          <Route path="/shipments-clients" component={LayoutDefault} />
          <Route path="/shipments-dates" component={LayoutDefault} />
          <Redirect from="/" exact to="/home" />
        </Switch>
      </div>
    </Router>
  );
}
export default AppNavigator;
