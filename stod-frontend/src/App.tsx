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
import { loadUser } from "./actions/authActions";
import {
  Login,
  Register,
  AuthenticatedRoute,
  Home,
  Groups,
  PostWrapper,
  Comments,
} from "./components";

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
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <div>
                    <img
                      src="/stod-logo-secondary.png"
                      alt="stod logo secondary"
                      height="250"
                      width="250"
                    />
                    <h1 style={{ marginLeft: "100px" }}>
                      This is a public page and can be viewed by anyone
                    </h1>
                  </div>
                )}
              />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              {/* <Route
                exact
                path="/groups"
                component={() => <Groups subscribedOnly={false} />}
              /> */}
              <Route
                exact
                path="/groups/subscribed"
                component={() => <Groups subscribedOnly={true} />}
              />
              <Route exact path="/posts" component={PostWrapper} />
              <AuthenticatedRoute path="/home" component={Home} />
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
