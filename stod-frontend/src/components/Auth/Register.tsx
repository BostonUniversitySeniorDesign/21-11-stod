// React imports
import React, { useRef } from "react";
// Material UI imports
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
//Global style import
import useStyles from "../../styles";
// TypeScript imports
import { IRootState, AUTH_ERROR } from "../../actions/types";
//Redux imports
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../actions/authActions";
// React router imports
import { Redirect } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Stod
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Register = () => {
  const classes = useStyles();
  // Refs for Register component
  const username = useRef<HTMLInputElement>();
  const email = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const confirm_password = useRef<HTMLInputElement>();
  // Redux store attributes
  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticated
  );
  const errors = useSelector((state: IRootState) => state.error);
  // Redux dispatch hook
  const dispatch = useDispatch();

  console.log(errors);

  /**
   * handleLogin is fired when a user clicks the register button. It is
   * given as a onSubmit parameter to the form. Once the inputs are
   * checked and sanitized, it dispatches the registerUser action with a
   * JSON of a new user object.
   */
  const handleRegister = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    // If any attributs are null we handle that error with UI
    if (
      password.current?.value === "" ||
      username.current?.value === "" ||
      confirm_password.current?.value === "" ||
      email.current?.value === ""
    ) {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          fallback_message: "No field can be empty",
        },
      });
      return;
    }
    // If passwords do not match we handle that error with UI
    if (password.current!.value !== confirm_password.current!.value) {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          fallback_message: "Passwords must match",
        },
      });
    } else {
      const newUser = {
        username: username.current!.value,
        password: password.current!.value,
        email: email.current!.value,
      };
      console.log(newUser);
      dispatch(registerUser(newUser));
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.registerImage} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img
            src="/stod-logo-secondary.png"
            alt="stod logo secondary"
            height="131"
            width="128"
          />

          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="email"
              inputRef={username}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              inputRef={email}
              autoComplete="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              inputRef={password}
              autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              label="Confirm Password"
              type="password"
              id="confirm_password"
              inputRef={confirm_password}
              autoComplete="current-password"
            />
            {errors.isError ? (
              <Alert severity="error">{errors.fallback_message}</Alert>
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
              onClick={handleRegister}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Login"}
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
export default Register;
