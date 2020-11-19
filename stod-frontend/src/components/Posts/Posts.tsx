import Typography from "@material-ui/core/Typography";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPosts } from "../../actions/postActions";
import { IRootState } from "../../actions/types";

const Posts: React.FC = () => {
    const dispatch = useDispatch();

    let currentState = useSelector(
        (state: IRootState) => state.groups
    );


    useEffect(()=>{
        dispatch(loadAllPosts());
      }, [])

    return(
        <h2>Hi</h2>
    );
}

export default Posts;