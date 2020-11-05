import { makeStyles } from "@material-ui/core/styles";

//Use this to create a style and access it by importing useStyles
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  loginImage: {
    backgroundImage: "url(/stod-login-bg.jpeg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  registerImage: {
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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(45deg, #e1e5f0 30%, #7795f2 90%)",
    borderRadius: 3,
    border: 0,
    color: "black",
    height: 48,
    padding: "0 30px",
  },
}));

export default useStyles;
