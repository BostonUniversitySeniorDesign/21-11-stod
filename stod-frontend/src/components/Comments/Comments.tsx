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
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { purple } from '@material-ui/core/colors';



const Comments: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const comment = useRef<HTMLInputElement>();
    //const comment_state = useSelector((state: any) => state.comments.comments)
    //comment_state.comments.map((comment: any) => (<h1>{comment.comment}</h1>))

    const darkTheme = (createMuiTheme as any) ({
      palette: {
        type: 'dark',
      },
      primary: {
        light: '#ff7961',
                    main: '#f44336',
                    contrastText: '#000',
        },
      secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
          },
    });

    const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (comment.current === null) {
                return;
            } else if (comment.current!.value === "") {
                alert("Please enter a comment");
                return;
            }
            dispatch(createComment("TEST NAME", comment.current!.value, 1, null, null));
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
                            <ThemeProvider theme={darkTheme}>
                            <CssBaseline/>
                                <Paper className={classes.paper}>
                                        <Grid container wrap="nowrap" spacing={2}>
                                          <Grid item>
                                            <Avatar>W</Avatar>
                                          </Grid>
                                          <Grid item xs zeroMinWidth>
                                            <Typography noWrap>{comment.comment}</Typography>
                                          </Grid>
                                        </Grid>
                                </Paper>
                            </ThemeProvider>
                         )
                    })
                }
                </div>
                <div>
                    <ThemeProvider theme={darkTheme}>
                        <CssBaseline/>
                        <form className={classes.form} onSubmit={handleCreate} noValidate>
                            <TextField color="secondary" id="comment" name="comment" inputRef={comment} label="Comment"/>
                            <Button color="secondary" type="submit" style={{border: "1px solid black"}}>Comment</Button>
                        </form>
                    </ThemeProvider>
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