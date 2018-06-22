import React, { PureComponent } from 'react';
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import { AuthorizeProvider } from 'components/AuthorizeProvider';

import Login from 'components/Login';
import Private from 'components/Private';
import Public from 'components/Public';
import PrivateRoute from 'components/PrivateRoute';

export class App extends PureComponent {
  render() {
    return (
      <AuthorizeProvider>
          <nav>
              <Link to="/" className="link">About author</Link>{''}
              <Link to="/main" className="link">Main page</Link>{''}
              <Link to="/login" className="link">Authorization</Link>
          </nav>
        <hr />
        <div>
            <Switch>
                <Route
                    path="/"
                    exact component={ Public }
                />
                <Route
                    path="/login"
                    component = { Login }
                />
                <PrivateRoute
                    path="/main"
                    component={ Private}
                />
            </Switch>
        </div>
      </AuthorizeProvider>
    );
  }
}
export default withRouter(App);
