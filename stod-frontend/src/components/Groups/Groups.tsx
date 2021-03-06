import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGroups, createGroup } from "../../actions/groupsActions";
import { IRootState, SingleGroup, IGroupsProps } from "../../actions/types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Group from "./Group";
import Typography from "@material-ui/core/Typography";

import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const DEV = false;


const Groups: React.FC<IGroupsProps> = (props: IGroupsProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const name = useRef<HTMLInputElement>();
  const description = useRef<HTMLInputElement>();

  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticated
  );

  const username = useSelector(
      (state: IRootState) => state.auth.user?.username
  );

  const groupCreateState = useSelector(
      (state: IRootState) => state.groupCreate
  );

  let currentState = useSelector((state: IRootState) => state.groups);

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.current === null || description.current === null) {
      return;
    } else if (
      name.current!.value === "" ||
      description.current!.value === ""
    ) {
      alert("Name and description must be entered");
      return;
    }
    dispatch(createGroup(name.current!.value, description.current!.value));
  };

  if (groupCreateState.isSuccess) {
    window.location.reload();
  }

  let renderBody: () => JSX.Element = () => {
    let targetGroups = props.subscribedOnly ? currentState.subscribedGroups : currentState.allGroups;
    if (currentState.isLoading) {
      return <h1>Loading...</h1>;
    } else if (currentState.isError) {
      return <h1>Error!</h1>;
    } else {
      return (
        <ul style={{ listStyleType: "none" }}>
          {targetGroups.map((group: SingleGroup) => {
            return (
              <Group name={group.name} description={group.description} displayJoinButton={!props.subscribedOnly}></Group>
            );
          })}
        </ul>
      );
    }
  };

    useEffect(() => {
        if (username !== undefined) {
            dispatch(fetchGroups(props.subscribedOnly, username));
        }
    }, [username]);

    return (
        <React.Fragment>
            {renderBody()}
            {
                DEV ? (
                !props.subscribedOnly ? (
                <form className={classes.form} onSubmit={handleCreate} noValidate>
                    <TextField id="name" name="name" inputRef={name} label="Name"/>
                    <TextField id="description" name="description" inputRef={description} label="Description"/>
                    <Button type="submit" style={{border: "1px solid black"}}>Submit</Button>
                </form>
                ) : null
                ) : null
            }
        </React.Fragment>
    )
}

export default Groups;
