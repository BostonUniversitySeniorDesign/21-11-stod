import React, { useState, useMemo } from "react";
import Button from "../../mui_components/StodButton";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PeopleIcon from "@material-ui/icons/People";
// import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
// import {useDispatch, useSelector} from "react-redux";
import { IRootState, IFriendObj } from "../../actions/types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import { acceptRequest, declineRequest } from "../../actions/friendActions";

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

function genSentList(friends: IFriendObj[], currentUser: string | undefined) {
  return friends.filter((x) => x.sender === currentUser && x.is_active);
}

function genRecivedList(
  friends: IFriendObj[],
  currentUser: string | undefined
) {
  return friends.filter((x) => x.sender !== currentUser && x.is_active);
}

const Navbar: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(false);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  let friends = useSelector((state: IRootState) => state.friends);
  let currentUser = useSelector(
    (state: IRootState) => state.auth.user?.username
  );

  console.log(friends);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
          <Typography>{currentUser}</Typography>
          <IconButton aria-label="delete" onClick={handleClick}>
            <PeopleIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography>Sent</Typography>
            <List dense>
              {genSentList(friends.friend_req, currentUser).map((s) => (
                <ListItem>
                  <ListItemText primary={s.reciver} />
                </ListItem>
              ))}
            </List>
            <Typography>Recived</Typography>
            <List dense>
              {genRecivedList(friends.friend_req, currentUser).map((s) => (
                <ListItem>
                  <Grid container>
                    <Grid item>
                      <Typography style={{ marginTop: 10 }}>
                        {s.sender}
                      </Typography>
                      {/* <ListItemText primary={s.sender} /> */}
                    </Grid>
                    <Grid item>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          dispatch(acceptRequest(s.id));
                        }}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          dispatch(declineRequest(s.id));
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                    {/* <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction> */}
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Popover>
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
