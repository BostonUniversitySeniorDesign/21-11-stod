// React imports
import React, { useRef } from "react";
// Material UI imports
import Button from "../../mui_components/StodButton";
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
// TypeScript imports
import { IRootState } from "../../actions/types";
//Redux imports
import { useSelector, useDispatch } from "react-redux";
import { registerUser, registerError } from "../../actions/authActions";
// React router imports
import { Redirect } from "react-router-dom";
import { fieldError, validateEmail } from "../";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/stod-login-bg.jpeg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
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
  const errors = useSelector((state: IRootState) => state.auth.errors);
  // Redux dispatch hook
  const dispatch = useDispatch();
  /**
   * handleLogin is fired when a user clicks the register button. It is
   * given as a onSubmit parameter to the form. Once the inputs are
   * checked and sanitized, it dispatches the registerUser action with a
   * JSON of a new user object.
   */
  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // If any attributs are null we handle that error with UI
    if (
      password.current?.value === "" ||
      username.current?.value === "" ||
      confirm_password.current?.value === "" ||
      email.current?.value === ""
    ) {
      dispatch(
        registerError(400, { non_field_errors: ["No field can be empty"] })
      );
      return;
    }
    if (!validateEmail(email.current?.value)) {
      dispatch(registerError(400, { email: ["Must be a valid email"] }));
      return;
    }
    // If passwords do not match we handle that error with UI
    if (password.current!.value !== confirm_password.current!.value) {
      dispatch(
        registerError(400, {
          password: ["Passwords must match"],
          confirm_password: ["Passwords must match"],
        })
      );
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
    return <Redirect to="/" />;
  }
  return (
    <Grid className={classes.root} container component="main">
      <CssBaseline />
      <Grid className={classes.image} item xs={false} sm={4} md={7} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img
            className={classes.avatar}
            src="/stod-logo-secondary.png"
            alt="stod logo secondary"
            height="131"
            width="128"
          />
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleRegister}>
            <TextField
              error={fieldError("username", errors).error}
              helperText={fieldError("username", errors).helperText}
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
              error={fieldError("email", errors).error}
              helperText={fieldError("email", errors).helperText}
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
              error={fieldError("password", errors).error}
              helperText={fieldError("password", errors).helperText}
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
              error={fieldError("confirm_password", errors).error}
              helperText={fieldError("confirm_password", errors).helperText}
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
            {errors.errors["non_field_errors"] ? (
              <Alert severity="error">
                {errors.errors["non_field_errors"][0]}
              </Alert>
            ) : (
              ""
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button className={classes.submit} type="submit" fullWidth>
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
