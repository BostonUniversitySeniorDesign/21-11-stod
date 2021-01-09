import { Card, CardContent, CardHeader, CardMedia, Popper } from "@material-ui/core";
import Chip from "@material-ui/core/Chip/Chip";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isTemplateExpression } from "typescript";
import { loadAllComments } from "../../actions/commentActions";
import { IComment, IRootState } from "../../actions/types";

const Comments: React.FC = () => {
    const dispatch = useDispatch();

    let currentState = useSelector(
        (state: IRootState) => state.comments
    );
    useEffect(()=>{
        dispatch(loadAllComments());
      }, [])
    if (!currentState.isLoading){
        return(
            <div>
                {
                    currentState.comments.map((comment: IComment) => {
                    return (
                    <Card style={{maxWidth: 600, margin: '30px'}} >
                        <CardHeader
                        title= {comment.id}
                        />
                        <CardContent>
                        <Typography variant="body2" color="textPrimary" >
                        {comment.comment}
                  </Typography>
                        </CardContent>

                        <CardContent>
                        <Typography variant="body2" color="textSecondary" >
                        Reply
                  </Typography>
                  <Typography variant="body2" color="textSecondary" style={{textAlign: "right"}}>
                        User: {comment.name}
                  </Typography>
                        </CardContent>

                    </Card>
                    )
                    })
                }
            </div>
        );
    }
    else{
        return(
            <h2>Loading</h2>
        );
    }



}

export default Comments;