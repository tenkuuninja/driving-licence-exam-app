import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import routes from './navigation'

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
