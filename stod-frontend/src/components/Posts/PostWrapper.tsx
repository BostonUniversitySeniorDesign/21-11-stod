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
import ReplyIcon from "@material-ui/icons/Reply";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useStyles from "../../styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";

const PostWrapper: React.FC = () => {
  const dispatch = useDispatch();
  const username = useSelector(
    (state: IRootState) => state.auth.user?.username
  );
  const cuurrr = useSelector((state: IRootState) => state);
  const classes = useStyles();
  const comment = useRef<HTMLInputElement>();
  const [currComment, setCurrComment] = useState<string | null>(null);
  const [currReply, setCurrReply] = useState<string | null>(null);

  const tagsState = useSelector((state: IRootState) => state.tags);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const filterPosts = (post: any) => {
    if (selectedTags.length == 0) {
      return true;
    } else {
      return selectedTags.some((e) => post.tags.includes(e));
    }
  };

  const handleTagSelect = (event: any) => {
    setSelectedTags(event.target.value as string[]);
    console.log(selectedTags);
    console.log(currentState.posts);
    console.log(currentState.posts.filter(filterPosts));
  };

  const handleCreate = (
    event: React.FormEvent<HTMLFormElement>,
    pid: number,
    currComment: string | null,
    parent: number | null,
    reply: string | null
  ) => {
    event.preventDefault();
    if (currComment === null) {
      return;
    } else if (currComment === "") {
      alert("Please enter a comment");
      return;
    }
    if (parent === null) {
      dispatch(
        createComment(comment.current!.name, currComment, pid, null, reply)
      );
    } else {
      dispatch(
        createComment(comment.current!.name, currComment, pid, parent, reply)
      );
    }
  };

  const renderTags = () => {
    if (tagsState.isLoading) {
      return <div>Loading...</div>;
    } else if (tagsState.isError) {
      return <div>Error loading tags!</div>;
    } else {
      return (
        <FormControl fullWidth>
          <InputLabel id="demo-mutiple-chip-label">Filter by tag(s)</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={selectedTags}
            onChange={handleTagSelect}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} style={{ margin: "2" }} />
                ))}
              </div>
            )}
          >
            {tagsState.allTags ? (
              tagsState.allTags.map((tag) => {
                return (
                  <MenuItem key={tag.name} value={tag.name}>
                    <Checkbox
                      color="primary"
                      checked={selectedTags.includes(tag.name)}
                    />
                    <ListItemText primary={tag.name} />
                  </MenuItem>
                );
              })
            ) : (
              <div />
            )}
          </Select>
        </FormControl>
      );
    }
  };

  let currentState = useSelector((state: IRootState) => state.posts);
  useEffect(() => {
    // @ts-ignore
    dispatch(loadAllPosts());
  }, [cuurrr.userGroup]);

  useEffect(() => {
    dispatch(loadAllComments());
  }, []);

  let currentCommentState = useSelector((state: IRootState) => state.comments);
  // console.log(currentCommentState.comments);

  const [showRep, setShowRepl] = React.useState<null | number>(null);

  if (!currentState.isLoading) {
    return (
      <PostContextProvider>
        <Paper>
          <Typography>Filter by tags {renderTags()}</Typography>
        </Paper>

        {currentState.posts.filter(filterPosts).map((post: IPost) => {
          return post.flagged === false ? (
            <div>
              <Divider style={{ backgroundColor: "#000000" }} />
              <Paper
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Post post={post} showPostMenu={post.poster === username} key={post.id} />
                {currentCommentState.comments.map((comment: IComment) => {
                  return comment.post === post.id ? (
                    <Paper
                      style={{
                        margin: 10,
                        // backgroundColor: "grey",
                      }}
                      elevation={0}
                    >
                      <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                          <Avatar>{comment.name.charAt(0)}</Avatar>
                        </Grid>
                        <Grid item xs zeroMinWidth>
                          {comment.parent === null ? null : (
                            <Typography noWrap>
                              Replied to "{comment.reply}"
                            </Typography>
                          )}
                          <Typography noWrap>
                            {comment.name}: {comment.comment}
                          </Typography>
                          <IconButton
                            color="primary"
                            aria-label="add to shopping cart"
                            size="small"
                            onClick={() =>
                              setShowRepl((p) =>
                                p === comment.id ? null : comment.id
                              )
                            }
                          >
                            <ReplyIcon />
                          </IconButton>
                          <form
                            hidden={showRep !== comment.id}
                            className={classes.form}
                            onSubmit={(e) => {
                              handleCreate(
                                e,
                                post.id,
                                currReply,
                                comment.id,
                                comment.comment
                              );
                              setShowRepl((p) =>
                                p === comment.id ? null : comment.id
                              );
                            }}
                            noValidate
                          >
                            <TextField
                              id="reply"
                              variant="outlined"
                              name="reply"
                              onChange={(e) => setCurrReply(e.target.value)}
                              label="Reply"
                            />
                            <Button
                              type="submit"
                              style={{ border: "1px solid black" }}
                            >
                              Reply
                            </Button>
                          </form>
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
                    handleCreate(e, post.id, currComment, null, null)
                  }
                  noValidate
                >
                  <Grid container>
                    <Grid item md={10}>
                      <TextField
                        id="comment"
                        // @ts-ignore
                        name={username}
                        variant="outlined"
                        fullWidth
                        inputRef={comment}
                        onChange={(e) => setCurrComment(e.target.value)}
                        label="Comment"
                      />
                    </Grid>
                    <Grid item md={2}>
                      <Button
                        type="submit"
                        style={{ border: "1px solid black" }}
                      >
                        Comment
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
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

export default PostWrapper;
