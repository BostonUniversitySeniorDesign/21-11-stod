import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPosts } from "../../actions/postActions";
import { IPost, IRootState } from "../../actions/types";
import Post from "./Post";
import PostContextProvider from "./PostContext";

const PostWrapper: React.FC = () => {
  const dispatch = useDispatch();
  const username = useSelector(
    (state: IRootState) => state.auth.user?.username
  );

  let currentState = useSelector((state: IRootState) => state.posts);
  useEffect(() => {
    dispatch(loadAllPosts());
  }, []);
  if (!currentState.isLoading) {
    return (
      <PostContextProvider>
        {currentState.posts.map((post: IPost) => {
          return (
            <div>
              <Post
                post={post}
                showPostMenu={post.poster === username}
                key={post.id}
              />
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
