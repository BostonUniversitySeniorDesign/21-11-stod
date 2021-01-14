import { Card, CardContent, CardHeader, CardMedia, Popper } from "@material-ui/core";
import Chip from "@material-ui/core/Chip/Chip";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useRef } from "react";
import useStyles from "../../styles";
import { useDispatch, useSelector } from "react-redux";
import { isTemplateExpression } from "typescript";
import { loadAllComments , createComment} from "../../actions/commentActions";
import { IComment, IRootState } from "../../actions/types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";



const Comments: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const comment = useRef<HTMLInputElement>();

    const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (comment.current === null) {
                return;
            } else if (comment.current!.value === "") {
                alert("Please enter a comment");
                return;
            }
            dispatch(createComment("TEST NAME", comment.current!.value, 1));
        }

    let currentState = useSelector(
        (state: IRootState) => state.comments
    );
    useEffect(()=>{
        dispatch(loadAllComments());
      }, [])
    if (!currentState.isLoading){
        return(
            <div>
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
                      <Typography variant="body2" color="textSecondary" style={{textAlign: "right"}}>
                            User: {comment.name}
                      </Typography>
                            </CardContent>

                        </Card>
                        )
                        })
                    }
                </div>
                <div>
                    <form className={classes.form} onSubmit={handleCreate} noValidate>
                        <TextField id="comment" name="comment" inputRef={comment} label="Comment"/>
                        <Button type="submit" style={{border: "1px solid black"}}>Comment</Button>
                    </form>
                </div>
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