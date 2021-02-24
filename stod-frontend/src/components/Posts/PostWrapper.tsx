import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPosts } from "../../actions/postActions";
import { IPost, IRootState, IComment } from "../../actions/types";
import Post from "./Post";
import PostContextProvider from "./PostContext";
import {
  loadAllComments,
  createComment,
  loadSpecificComments,
} from "../../actions/commentActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useStyles from "../../styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const PostWrapper: React.FC = () => {
  const dispatch = useDispatch();
<<<<<<< HEAD
  const username = useSelector(
    (state: IRootState) => state.auth.user?.username
  );
=======
  const classes = useStyles();
  const comment = useRef<HTMLInputElement>();
  const [currComment, setCurrComment] = useState<string | null>(null);

  const handleCreate = (
    event: React.FormEvent<HTMLFormElement>,
    pid: number,
    currComment: string | null
  ) => {
    event.preventDefault();
    if (currComment === null) {
      return;
    } else if (currComment === "") {
      alert("Please enter a comment");
      return;
    }
    dispatch(createComment(comment.current!.name, currComment, pid));
  };
>>>>>>> dd505f16c017fc5b06b8be748d62248166f7c81a

  let currentState = useSelector((state: IRootState) => state.posts);
  useEffect(() => {
    dispatch(loadAllPosts());
  }, []);

  useEffect(() => {
    dispatch(loadAllComments());
  }, []);

  let currentCommentState = useSelector((state: IRootState) => state.comments);
  console.log(currentCommentState.comments);

  if (!currentState.isLoading) {
    return (
      <PostContextProvider>
        {currentState.posts.map((post: IPost) => {
          return (
            <div>
<<<<<<< HEAD
              <Post
                post={post}
                showPostMenu={post.poster === username}
                key={post.id}
              />
=======
              <Post post={post} showPostMenu={true} key={post.id} />
              <form
                className={classes.form}
                onSubmit={(e) => handleCreate(e, post.id, currComment)}
                noValidate
              >
                <TextField
                  id="comment"
                  name="comment"
                  inputRef={comment}
                  onChange={(e) => setCurrComment(e.target.value)}
                  label="Comment"
                />
                <Button type="submit" style={{ border: "1px solid black" }}>
                  Comment
                </Button>
              </form>
              {currentCommentState.comments.map((comment: IComment) => {
                return comment.post === post.id ? (
                  <Paper className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Avatar>{comment.name}</Avatar>
                      </Grid>
                      <Grid item xs zeroMinWidth>
                        <Typography noWrap>{comment.comment}</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                ) : (
                  ""
                );
              })}
>>>>>>> dd505f16c017fc5b06b8be748d62248166f7c81a
            </div>
          );
        })}
      </PostContextProvider>
    );
  } else {
    return <h2>Loading</h2>;
  }
};

export default PostWrapper;
