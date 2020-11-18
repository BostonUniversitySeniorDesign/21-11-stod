import React, { useEffect } from "react";
import useStyles from "../../styles";
import { useSelector, useDispatch } from "react-redux";
import { fetchGroups } from "../../actions/groupsActions";
import { IRootState, SingleGroup } from "../../actions/types";
import Group from "./Group";

const Groups: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(
        (state: IRootState) => state.auth.isAuthenticated
    );

    let currentState = useSelector(
        (state: IRootState) => state.groups
    );

    let renderBody: () => JSX.Element = () => {
        if (currentState.isLoading) {
            return <h1>Loading...</h1>
        } else if (currentState.isError) {
            return <h1>Error!</h1> 
        } else {
            return (
            <ul style={{listStyleType: "none"}}> 
                {
                    currentState.groups.map((group: SingleGroup) => {
                        return <Group name={group.name} description={group.description}></Group>
                    })
                }
            </ul>
            )
        }
    }

    useEffect(() => {
        dispatch(fetchGroups());
    }, []);

    return (
        <React.Fragment>
            {renderBody()}
        </React.Fragment>
    )
}

export default Groups;