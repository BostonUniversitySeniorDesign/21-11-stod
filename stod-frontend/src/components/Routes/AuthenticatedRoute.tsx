import React, { FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import { Loader } from "../";
import { IAuthState, IRootState } from "../../actions/types";
import { useSelector, useDispatch } from "react-redux";

interface IAuthenticatedRoute {
  component: FunctionComponent<any>;
  exact?: boolean;
  path: string;
}

const AuthenticatedRoute: React.FC<IAuthenticatedRoute> = ({
  component: Component,
  ...rest
}) => {
  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticated
  );
  const isLoading = useSelector((state: IRootState) => state.auth.isLoading);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) {
          return <Loader />;
        } else if (!isAuthenticated || isAuthenticated === null) {
          return <Redirect from="/home" to="/login" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default AuthenticatedRoute;
