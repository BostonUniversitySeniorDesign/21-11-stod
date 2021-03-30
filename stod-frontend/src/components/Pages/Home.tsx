import React, { useState, useEffect } from "react";
// mui
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { logout } from "../../actions/authActions";
import Button from "../../mui_components/StodButton";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Menu } from "@material-ui/core";
import { SWITCH_GROUP, DOMAIN, IUser } from "../../actions/types";
import { tokenConfig } from "../../actions/authActions";
import UserView from "../Users/UserView";
import { SocketProvider } from "../../contexts/SocketContext";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Navbar from "../Common/Navbar";
import Groups from "../Groups/Groups";
import axios from "axios";
// icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import PaymentIcon from "@material-ui/icons/Payment";
import CreatePost from "../Posts/CreatePost";
import PostWrapper from "../Posts/PostWrapper";
import Paper from "@material-ui/core/Paper";
import {
  IGroupsAction,
  IRootState,
  SingleGroup,
  IUserGroup,
} from "../../actions/types";
import { fetchGroups, unsubscribeFromGroup } from "../../actions/groupsActions";
import { getRequests, getFriendList } from "../../actions/friendActions";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { createPost } from "../../actions/postActions";
import { fetchAllTags } from "../../actions/tagsActions";
import MenuItem from '@material-ui/core/MenuItem';

const drawerWidth = 180;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      // flexDirection: "column",
      justifyContent: "center",
    },
    mid_paper: {
      padding: theme.spacing(3, 2),
      width: 800,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      width: "100%",
      // [theme.breakpoints.up("sm")]: {
      //   width: `calc(100% - ${drawerWidth}px)`,
      //   marginLeft: drawerWidth,
      // },
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      padding: theme.spacing(3),
    },
    button: {
      color: theme.palette.primary.main,
      background: "white",
      boxShadow: "none",
      width: "100%",
      justifyContent: "flex-start",
      textAlign: "left",
      padding: "0 10px",
      paddingTop: "20px",
      paddingBottom: "20px",
      borderRadius: "0px 50px 50px 0px",
      "&:hover": {
        boxShadow: "none",
      },
    },
    item: {
      display: "flex",
      paddingTop: 0,
      paddingBottom: 0,
    },
    typo: {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightLight,
      marginLeft: "10px",
    },
    typo_head: {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
      marginLeft: "10px",
    },
    active: {
      color: theme.palette.primary.main,
      "& $typo": {
        color: "#373B44",
        fontWeight: theme.typography.fontWeightBold,
      },
      background: "white",
      boxShadow: "none",
      borderRadius: "0px 50px 50px 0px",
      width: "100%",
      justifyContent: "flex-start",
      textAlign: "left",
      padding: "0 10px",
      paddingTop: "20px",
      paddingBottom: "20px",
      "&:hover": {
        boxShadow: "none",
      },
    },
  })
);

function getSelectedComponent(
  {
    name,
    section,
  }: {
    name: string;
    section: string;
  },
  username: string
) {
  if (name === "Find Groups") return <Groups subscribedOnly={false} />;
  if (name === "home")
    return (
      <>
        <PostWrapper />
      </>
    );
  if (section === "Friends")
    return (
      <SocketProvider id={username}>
        <UserView name={name} />
      </SocketProvider>
    );
  return (
    <>
      <CreatePost key={1} />
      <PostWrapper />
    </>
  );
}

async function renderAllUsers(getState: () => IRootState) {
  const res = await axios.get(
    `http://${DOMAIN}/accounts/all_users/`,
    tokenConfig(getState)
  );
  return res.data as IUser[];
}

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState({ section: "Main", name: "home" });
  const [allUsers, setAllUsers] = useState<null | IUser[]>(null);
  const icons = [
    <DashboardIcon className={classes.typo} />,
    <PaymentIcon className={classes.typo} />,
  ];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleRightClickClose = () => {
    setAnchorEl(null);
  };

  const username = useSelector(
    (state: IRootState) => state.auth.user?.username
  ) as string;

  const friend_list = useSelector(
    (state: IRootState) => state.friends.friend_obj?.friends
  ) as string[];

  let currentGroupsState = useSelector((state: IRootState) => state.groups);
  let currentState = useSelector((state: IRootState) => state);

  useEffect(() => {
    if (username !== undefined) {
      dispatch(fetchGroups(true, username));
    }
  }, [username, dispatch]);

  useEffect(() => {
    dispatch(getRequests());
  }, []);

  useEffect(() => {
    dispatch(getFriendList());
  }, []);

  useEffect(() => {
    renderAllUsers(() => currentState).then((r) => {
      setAllUsers(r);
      console.log(r.length);
    });
  }, []);

  useEffect(() => {
    dispatch(fetchAllTags());
  }, []);

  const handleUnsubscribe = (group: string | undefined | null) => {
    if (username !== undefined && group !== null && group !== undefined) {
      dispatch(unsubscribeFromGroup(username, group));
    }
    handleRightClickClose();
  }

  const renderGroupsSidebar = () => {
    if (currentGroupsState.isLoading) {
      return <div>Loading...</div>;
    } else if (currentGroupsState.isError) {
      return <div>Error!</div>;
    } else {
      if (currentGroupsState.subscribedGroups.length === 0) {
        return <div>You aren't subscribed to any groups!</div>;
      } else {
        return (
          <React.Fragment>

          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleRightClickClose}>
            <MenuItem onClick={() => handleUnsubscribe(anchorEl?.textContent)}>Unsubscribe</MenuItem>
          </Menu>

          <List>
            {currentGroupsState.subscribedGroups.map((group, i) => {
              return (
                <ListItem
                  key={i}
                  className={classes.item}
                  style={{ margin: 0, padding: 0 }}
                  onContextMenu = {(e) => {setAnchorEl(e.currentTarget); e.preventDefault()}}
                >
                  <Button
                    className={
                      selected.name == group.name
                        ? classes.active
                        : classes.button
                    }
                    key={i}
                    onClick={() => {
                        setSelected({ name: group.name, section: "Groups" });
                        dispatch({ type: SWITCH_GROUP, payload: group.name });
                      }
                    }
                  >
                    <Typography variant="subtitle1" className={classes.typo}>
                      {group.name}
                    </Typography>
                  </Button>
                </ListItem>
              );
            })}
          </List>
          </React.Fragment>

        );
      }
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <Typography variant="h6" className={classes.typo_head}>
        Main
      </Typography>
      <List>
        {["home"].map((text, index) => (
          <ListItem
            key={text}
            className={classes.item}
            style={{ margin: 0, padding: 0 }}
          >
            <Button
              className={
                selected.name == text ? classes.active : classes.button
              }
              key={text}
              onClick={() => {
                setSelected({ name: text, section: "Main" });
                dispatch({ type: SWITCH_GROUP, payload: text });
              }}
              fullWidth
            >
              <Typography variant="subtitle1" className={classes.typo}>
                {text}
              </Typography>
            </Button>
          </ListItem>
        ))}
        <ListItem className={classes.item} style={{ margin: 0, padding: 0 }}>
          <Button
            className={
              selected.name === "Find Groups" ? classes.active : classes.button
            }
            onClick={() => {
              setSelected({ name: "Find Groups", section: "Main" });
              dispatch({ type: SWITCH_GROUP, payload: "Find Groups" });
            }}
            fullWidth
          >
            <Typography variant="subtitle1" className={classes.typo}>
              Find Groups
            </Typography>
          </Button>
        </ListItem>
      </List>
      <Divider />
      {/* <Typography variant="h6" className={classes.typo_head}>
        Account
      </Typography>
      <List style={{ margin: 0, padding: 0 }}>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem
            key={text}
            className={classes.item}
            style={{ margin: 0, padding: 0 }}
          >
            <Button
              className={selected == text ? classes.active : classes.button}
              key={text}
              onClick={() => setSelected(text)}
            >
              <Typography variant="subtitle1" className={classes.typo}>
                {text}
              </Typography>
            </Button>
          </ListItem>
        ))}
      </List> */}
      <Divider />
      <Typography variant="h6" className={classes.typo_head}>
        Your Groups
      </Typography>
      {renderGroupsSidebar()}
      <Divider />
      <Typography variant="h6" className={classes.typo_head}>
        Friends
      </Typography>
      <List style={{ margin: 0, padding: 0 }}>
        {friend_list
          ? friend_list.map((user) => (
              <ListItem
                key={user}
                className={classes.item}
                style={{ margin: 0, padding: 0 }}
              >
                <Button
                  className={
                    selected.name === user ? classes.active : classes.button
                  }
                  key={user}
                  onClick={() =>
                    setSelected({ name: user, section: "Friends" })
                  }
                >
                  <Typography variant="subtitle1" className={classes.typo}>
                    {user}
                  </Typography>
                </Button>
              </ListItem>
            ))
          : ""}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar
        handleDrawerToggle={handleDrawerToggle}
        appBar={classes.appBar}
        menuButton={classes.menuButton}
      />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* <Typography paragraph variant="h6">
          Hello
        </Typography> */}
        {/* {currGroup === home ? 
        <CreatePost></CreatePost>
        <PostWrapper></PostWrapper>
        : 
        <Groups subscribedOnly={false} />}
        } */}
        <Paper className={classes.mid_paper}>
          {getSelectedComponent(selected, username)}
        </Paper>
      </main>
    </div>
  );
};
export default Home;
