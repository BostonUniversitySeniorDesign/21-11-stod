import { Card, CardContent, CardHeader, CardMedia, Popper } from "@material-ui/core";
import Chip from "@material-ui/core/Chip/Chip";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isTemplateExpression } from "typescript";
import { loadAllPosts } from "../../actions/postActions";
import { IPost, IRootState } from "../../actions/types";
import PostMenu from "./PostMenu";
import Post from "./Post"
import PostContextProvider from "./PostContext"

const Posts: React.FC = () => {
    const dispatch = useDispatch();

    let currentState = useSelector(
        (state: IRootState) => state.posts
    );
    useEffect(()=>{
        dispatch(loadAllPosts());
      }, [])
    if (!currentState.isLoading){
        return(
            <PostContextProvider>
                {
                    currentState.posts.map((post: IPost) => {
                    return (
                        <div>
                    <Post post={post}/>
                  
                  </div>
                    )
                    })
                }
            </PostContextProvider>
        );
    }
    else{
        return(
            <h2>Loading</h2>
        );
    }
    


}

export default Posts;