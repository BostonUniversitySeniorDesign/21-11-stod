// React imports
import React, { useRef } from "react";
// Material UI Imports
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
// Import global style
import useStyles from "../../styles";
// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { login, loginError } from "../../actions/authActions";
// Typescript imports
import { IRootState } from "../../actions/types";
// React router imports
import { Redirect } from "react-router-dom";

import { fieldError } from "../";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Stod
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login: React.FC = () => {
  // Accessing useStyles from global styles in styles.ts
  const classes = useStyles();
  /**
   * useRef is a React hook used to reference a field input. in this case
   * we are referencing the username and password TextFields by creating two
   * references to it.
   */
  const username = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  /**
   * useSelector is a Redux hook used to access a attribute from the global store.
   * Here its accessing the isAuthenticated to check if the user
   * is authenticated.
   */
  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticated
  );
  const errors = useSelector((state: IRootState) => state.auth.errors);
  /**
   * useDispatch is a Redux hook used to dispatch an action.
   */
  const dispatch = useDispatch();

  /**
   * handleLogin is fired when a user clicks the login button. It is
   * given as a onSubmit parameter to the form. Once the inputs are
   * checked and sanitized, it dispatches the login action with the
   * given username and password.
   */
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    /**
     * Use preventDefault when using onSubmit handlers. It prevents default browser
     * properties such as changing the url when the button is clicked.
     */
    event.preventDefault();
    /**
     * the exclamation is used to tell typescript this expression cannot
     * be null or undefined here, so don't complain about the possibility
     * of it being null or undefined. I used it since under the hood useRef uses document.getElementBy
     * which could passibly be undefined, so typescript complains that it could be undefined becuase
     * login(username: string, password: string) expects string inputs. This may come up when using useRef
     * so add the exclamation when doing so.
     */
    if (username.current?.value === "" || password.current?.value === "") {
      dispatch(loginError(400, { login: ["No field can be empty"] }));
      return;
    }

    console.log(username.current!.value, password.current!.value);
    dispatch(login(username.current!.value, password.current!.value));
  };

  /*
   * If the user is already authenticated, i.e an unexpired valid token
   * was found in localStorage. Redirect them to the home page.
   * for token logic check reducers/authReducer.ts.
   */
  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      {/**
       * To access styles use classes.<defined style>
       */}
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.loginImage} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img
            src="/stod-logo-secondary.png"
            alt="stod logo secondary"
            height="131"
            width="128"
          />

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {/**
           * Main form where username and password are input
           */}
          <form className={classes.form} onSubmit={handleLogin} noValidate>
            <TextField
              error={fieldError("username", errors).error}
              helperText={fieldError("username", errors).helperText}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              inputRef={username}
              label="Username"
              autoFocus
            />
            <TextField
              error={fieldError("password", errors).error}
              helperText={fieldError("password", errors).helperText}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              inputRef={password}
              label="Password"
              autoComplete="current-password"
            />
            {errors.errors["login"] ? (
              <Alert severity="error">{errors.errors["login"][0]}</Alert>
            ) : (
              ""
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default Login;
