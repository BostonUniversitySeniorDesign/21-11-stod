import React from "react";
import { SingleGroup } from "../../actions/types";
import useStyles from "../../styles";
import Paper from "@material-ui/core/Paper";

const Group: React.FC<SingleGroup> = (props: SingleGroup) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <li>
                <Paper elevation={2}>
                    <h3>{props.name}</h3>
                    <div>{props.description}</div>
                </Paper>
            </li>
        </React.Fragment>
    )
}

export default Group;