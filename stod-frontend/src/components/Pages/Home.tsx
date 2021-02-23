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
import { CssBaseline, Switch } from "@material-ui/core";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Navbar from "../Common/Navbar";
// icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import PaymentIcon from "@material-ui/icons/Payment";
import Groups from "../Groups/Groups";
import { IGroupsAction, IRootState, SingleGroup } from "../../actions/types";
import { fetchGroups } from "../../actions/groupsActions";
import { useHistory } from "react-router-dom";

const drawerWidth = 180;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
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
      flexGrow: 1,
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

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const icons = [
    <DashboardIcon className={classes.typo} />,
    <PaymentIcon className={classes.typo} />,
  ];

  const username = useSelector(
    (state: IRootState) => state.auth.user?.username
  );

  let currentGroupsState = useSelector((state: IRootState) => state.groups);

  useEffect(() => {
    if (username !== undefined) {
      dispatch(fetchGroups(true, username));
    }
  }, [username, dispatch]);

  const renderGroupsSidebar = () => {
    if (currentGroupsState.isLoading) {
      return <div>Loading...</div>;
    } else if (currentGroupsState.isError) {
      return <div>Error!</div>;
    } else {
      if (currentGroupsState.groups.length === 0) {
        return (
          <div>You aren't subscribed to any groups!</div>
        )
      } else {
        return (
          <List>
            {
              currentGroupsState.groups.map((group, i) => {
                return (
                  <ListItem key={i} className={classes.item} style={{margin: 0, padding: 0}}>
                    <Button
                      className={selected == group.name ? classes.active : classes.button}
                      key={i}
                      onClick={() => setSelected(group.name)}
                    >
                      <Typography variant="subtitle1" className={classes.typo}>
                        {group.name}
                      </Typography>
                    </Button>
                  </ListItem>
                )
              })
            }
          </List>
        )
      }
    }
  }

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
        {["Dashboard", "Billing"].map((text, index) => (
          <ListItem
            key={text}
            className={classes.item}
            style={{ margin: 0, padding: 0 }}
          >
            <Button
              className={selected == text ? classes.active : classes.button}
              key={text}
              onClick={() => setSelected(text)}
              fullWidth
            >
              <Typography variant="subtitle1" className={classes.typo}>
                {text}
              </Typography>
            </Button>
          </ListItem>
        ))}
        <ListItem
            className={classes.item}
            style={{ margin: 0, padding: 0 }}
          >
            <Button
              className={selected == "Find Groups" ? classes.active : classes.button}
              onClick={() => {
                setSelected("Find Groups");
                history.push('/groups');
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
      <Typography variant="h6" className={classes.typo_head}>
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
      </List>
      <Divider />
      <Typography variant="h6" className={classes.typo_head}>
        Your Groups
      </Typography>
      {renderGroupsSidebar()}
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
        <Typography paragraph variant="h6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph variant="h6">
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>
    </div>
  );
};
export default Home;
