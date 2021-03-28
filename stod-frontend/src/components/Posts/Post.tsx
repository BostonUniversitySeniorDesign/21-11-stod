import {
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { IPost, IRootState } from "../../actions/types";
import PostMenu from "./PostMenu";
import Chip from '@material-ui/core/Chip';


const renderTags = (tags: string[]) => {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {tags.map((tag) => 
        <Chip key={tag} label={tag} style={{margin: '2px'}}/>
      )}
    </div>
  )
}

const Post: React.FC<{ post: IPost; showPostMenu: boolean }> = ({
  post,
  showPostMenu,
}) => {
  return (
    <Card style={{ maxWidth: 600, margin: "30px" }}>
      {showPostMenu ? <PostMenu post={post} /> : null}
      <CardHeader title={post.title} />
      <CardContent>
        <Typography variant="body2" color="textPrimary">
          {post.contents}
        </Typography>
      </CardContent>
      <Typography style={{ margin: 25 }} variant="body2" color="textPrimary">
        Poster: {post.poster}
        <br></br>
        Created: {post.date}
        <br/>
        Posted in: {post.group}
        <br/>
        Tags: {renderTags(post.tags)}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary"></Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
