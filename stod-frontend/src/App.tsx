import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import store from "./store";
import Error from "./components/Common/404";
import { Provider } from "react-redux";
import { loadUser } from "./actions/authAction";
import { Login, Register } from "./components";

const App = () => {
  // We attempt to load a user as soon as they visit the site
  useEffect(() => {
    store.dispatch<any>(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <div className="container">
            {/* Site routes */}
            <Switch>
              <Route exact path="/" render={() => <h2>Hi</h2>} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/404" component={Error} />
              <Redirect from="*" to="/404" />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </Provider>
  );
};

export default App;
