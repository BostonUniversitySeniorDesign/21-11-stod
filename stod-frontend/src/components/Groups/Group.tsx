import React from "react";
import { SingleGroup } from "../../actions/types";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Group: React.FC<SingleGroup> = (props: SingleGroup) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <li>
        <Paper elevation={2} className={classes.paper}>
          <h3>{props.name}</h3>
          <div>{props.description}</div>
        </Paper>
      </li>
    </React.Fragment>
  );
};

export default Group;
