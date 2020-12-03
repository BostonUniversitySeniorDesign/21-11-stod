import React, { useState, useMemo } from "react";
import Button from "../../mui_components/StodButton";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";

interface Props {
  handleDrawerToggle: () => void;
  appBar: string;
  menuButton: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  seperator: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));

const Navbar: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(false);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(!mode);
  };

  const dark_theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: mode ? "dark" : "light",
        },
      }),
    [mode]
  );

  return (
    <div>
      <AppBar position="fixed" className={props.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            className={props.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <img
            src="/stod-full-logo.png"
            alt="logo"
            height="37.5px"
            width="100.5px"
          />
          <div className={classes.seperator} />
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
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
