/**
 * This index file is used for easy imports into other modules. For ex:
 *
 * if im importing Login.tsx and Register.tsx from App.tsx, all i need to do is:
 * import { Login, Register } from "./components";
 *
 * if i didnt have a index file i will have to do:
 * import Login from "./componets/Auth/Login";
 * import Register from "./componets/Auth/Register";
 */

import Login from "./Auth/Login";
import Register from "./Auth/Register";
import AuthenticatedRoute from "./Routes/AuthenticatedRoute";
import Error from "./Common/404";
import Loader from "./Common/Loader";
import Home from "./Pages/Home";
import Groups from "./Groups/Groups";
import PostWrapper from "./Posts/PostWrapper";
import { fieldError, validateEmail } from "./Common/helper_funcs";
import Flagged from "./Flagged/Flagged";
import IsSuperuserRoute from "./Routes/IsSuperuserRoute";

export {
  Login,
  Register,
  AuthenticatedRoute,
  Error,
  Loader,
  Home,
  Groups,
  fieldError,
  PostWrapper,
  validateEmail,
  Flagged,
  IsSuperuserRoute,
};
