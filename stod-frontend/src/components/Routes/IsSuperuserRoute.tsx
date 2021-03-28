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

const IsSuperuserRoute: React.FC<IAuthenticatedRoute> = ({
  component: Component,
  ...rest
}) => {
  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticated
  );
  const isSuperuser = useSelector(
    (state: IRootState) => state.auth.user?.is_superuser
  );
  const isLoading = useSelector((state: IRootState) => state.auth.isLoading);

  console.log(isSuperuser, isLoading);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading || !isSuperuser) {
          return <Loader />;
        } 
        else if (!isAuthenticated || isAuthenticated === null) {
          return <Redirect to="/login" />;
        } else if (!isSuperuser || isSuperuser === null) {
          return <Redirect to="/home" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default IsSuperuserRoute;
