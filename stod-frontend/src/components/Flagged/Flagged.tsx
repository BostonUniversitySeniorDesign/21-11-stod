import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPosts } from "../../actions/postActions";
import { IPost, IRootState, IComment } from "../../actions/types";
import Post from "../Posts/Post";
import PostContextProvider from "../Posts/PostContext";
import {
  loadAllComments,
} from "../../actions/commentActions";
import {
    changeFlaggedPost,
    deleteFlaggedPost,
} from "../../actions/flaggedActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useStyles from "../../styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const Flagged: React.FC = () => {
  const dispatch = useDispatch();
  const cuurrr = useSelector((state: IRootState) => state);
  const classes = useStyles();

  const handleApprove = (
    event: React.FormEvent<HTMLFormElement>,
    pid: number,
    flaggedSetting: boolean
  ) => {
    event.preventDefault();
    dispatch(
    changeFlaggedPost(pid, flaggedSetting)
    );
  };

  const handleDeny = (
    event: React.FormEvent<HTMLFormElement>,
    pid: number
  ) => {
    event.preventDefault();
    dispatch(
    deleteFlaggedPost(pid)
    );
  };

  let currentState = useSelector((state: IRootState) => state.posts);
  useEffect(() => {
    // @ts-ignore
    console.log(cuurrr.userGroup);
    dispatch(loadAllPosts());
  }, [cuurrr.userGroup, currentState]);

  useEffect(() => {
    dispatch(loadAllComments());
  }, []);

  let currentCommentState = useSelector((state: IRootState) => state.comments);

  if (!currentState.isLoading) {
    return (
      <PostContextProvider>
        {currentState.posts.map((post: IPost) => {
          return post.flagged === true ?(
            <div>
              <Divider style={{ backgroundColor: "#000000" }} />
              <Post post={post} showPostMenu={true} key={post.id} />
              {currentCommentState.comments.map((comment: IComment) => {
                return comment.post === post.id ? (
                  <Paper className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Avatar>{comment.name}</Avatar>
                      </Grid>
                      <Grid item xs zeroMinWidth>
                        {comment.parent === null ? null : (
                          <Typography noWrap>
                            Replied to "{comment.reply}"
                          </Typography>
                        )}
                        <Typography noWrap>{comment.comment}</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                ) : (
                  ""
                );
              })}
              <form
                className={classes.form}
                onSubmit={(e) =>
                  handleApprove(e, post.id, false)
                }
                noValidate
              >
                <Button type="submit" style={{ border: "1px solid black" }}>
                  Approve
                </Button>
              </form>
              <form
                className={classes.form}
                onSubmit={(e) =>
                  handleDeny(e, post.id)
                }
                noValidate
              >
                <Button type="submit" style={{ border: "1px solid black" }}>
                  Deny
                </Button>
              </form>
            </div>
          ) : (
            ""
          );
        })}
      </PostContextProvider>
    );
  } else {
    return <h2>Loading</h2>;
  }
};

export default Flagged;
