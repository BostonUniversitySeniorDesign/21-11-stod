import React from "react";
import { IRootState, SingleGroup } from "../../actions/types";
import Paper from "@material-ui/core/Paper";
import { subscribeToGroup } from "../../actions/groupsActions";
import { useSelector, useDispatch } from "react-redux";
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
  const dispatch = useDispatch();

  const username = useSelector(
    (state: IRootState) => state.auth.user?.username
  );


  const handleSubscribe = () => {
    if (username !== undefined) {
      dispatch(subscribeToGroup(username, props.name));
    }
  }

  return (
    <React.Fragment>
      <li>
        <Paper elevation={2} className={classes.paper}>
          <h3>{props.name}</h3>
          <div>{props.description}</div>
          {props.displayJoinButton ? <button onClick={handleSubscribe}>Subscribe</button> : null}
        </Paper>
      </li>
    </React.Fragment>
  )
}

export default Group;
