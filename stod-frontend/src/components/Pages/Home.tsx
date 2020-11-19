import React from "react";
import { logout } from "../../actions/authActions";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Switch } from "@material-ui/core";

const Home = () => {
  const dispatch = useDispatch();

  const [mode, setMode] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(!mode);
  };

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: mode ? "dark" : "light",
        },
      }),
    [mode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <h1>Home</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(logout())}
        >
          Logout
        </Button>
        <Switch
          checked={mode}
          onChange={handleChange}
          color="primary"
          name="mode"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <h2>This is a home page and can only be viewd by a logged in user</h2>
      </div>
    </ThemeProvider>
  );
};
export default Home;
