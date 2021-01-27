import { Card, CardContent, CardHeader, CardMedia, Popper } from "@material-ui/core";
import Chip from "@material-ui/core/Chip/Chip";
import Typography from "@material-ui/core/Typography";
import { getSuggestedQuery } from "@testing-library/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isTemplateExpression } from "typescript";
import { loadAllPosts } from "../../actions/postActions";
import { IPost, IRootState } from "../../actions/types";


const PostMenu: React.FC<{poster:string}> = ({poster}) => {


    // const dispatch = useDispatch(); //set dispatch

    // useEffect(()=>{
    //     dispatch(loadAllPosts());
    //   }, [])
    const user = useSelector(
        (state: IRootState) => state.auth.user?.username
    );
      
    return(
      <>
        <Typography variant="body2" color="textSecondary" style={{textAlign: "right"}}>
        User: {poster}
    </Typography>
    {poster === user ? (<>Poster"</>) : (<>Non-Poster</>)}

    </>
    );
      
}

export default PostMenu;