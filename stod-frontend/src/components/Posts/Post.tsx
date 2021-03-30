import { Card, CardContent, CardHeader } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { IPost, IRootState } from "../../actions/types";
import PostMenu from "./PostMenu";
import Chip from "@material-ui/core/Chip";
import { UserProfile } from "../Common/UserProfile";
import Link from "@material-ui/core/Link";
import { useSelector, useDispatch } from "react-redux";

const renderTags = (tags: string[]) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {tags.map((tag) => (
        <Chip key={tag} label={tag} style={{ margin: "2px" }} />
      ))}
    </div>
  );
};

const Post: React.FC<{ post: IPost; showPostMenu: boolean }> = ({
  post,
  showPostMenu,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  let currentUser = useSelector(
    (state: IRootState) => state.auth.user?.username
  );

  return (
    <Card style={{ maxWidth: 600, margin: "30px" }} elevation={0}>
      {showPostMenu ? <PostMenu post={post} /> : null}
      <CardHeader title={post.title} />
      <CardContent>
        <Typography variant="body2" color="textPrimary">
          {post.contents}
        </Typography>
      </CardContent>
      <UserProfile
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        user={post.poster}
      />
      <Typography style={{ margin: 25 }} variant="body2" color="textPrimary">
        Poster:{" "}
        <Link
          component="button"
          variant="body2"
          onClick={handleClick}
          disabled={currentUser === post.poster}
        >
          {post.poster}
        </Link>
        <br></br>
        Created: {post.date}
        <br />
        Posted in: {post.group}
        <br />
        Tags: {renderTags(post.tags)}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary"></Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
