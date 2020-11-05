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

export { Login, Register };
