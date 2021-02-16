import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
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
import PostWrapper from "../Posts/PostWrapper";
import CreatePost from "../Posts/CreatePost";

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

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const icons = [
    <DashboardIcon className={classes.typo} />,
    <PaymentIcon className={classes.typo} />,
  ];

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
        <CreatePost></CreatePost>
        <PostWrapper></PostWrapper>
      </main>
    </div>
  );
};
export default Home;
