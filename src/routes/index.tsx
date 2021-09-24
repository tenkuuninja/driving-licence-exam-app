import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import routes from './path'

const Routes = function() {
  return(
    <Router>
      <Switch>
        {routes.map((route, i) => {
          return <Route key={i} {...route} />
        })}
      </Switch>
    </Router>
  );
}

export default Routes;
