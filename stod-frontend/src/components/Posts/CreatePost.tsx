import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IPost, IRootState } from "../../actions/types";
import Post from "./Post";
import Button from "@material-ui/core/Button";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import { createPost } from "../../actions/postActions";
import { fetchAllTags } from "../../actions/tagsActions";

import {
  createStyles,
  CssBaseline,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import useStyles from "../../styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const CreatePost: React.FC = () => {
  const dispatch = useDispatch();

  const username = useSelector(
    (state: IRootState) => state.auth.user?.username
  );
  const currentGroup = useSelector(
    (state: IRootState) => state.userGroup.currentGroup
  );
  const tagsState = useSelector(
    (state: IRootState) => state.tags
  );
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  let currentState = useSelector((state: IRootState) => state.posts);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (
      title!.current!.value === null ||
      title!.current!.value === "" ||
      contents!.current!.value === null ||
      contents!.current!.value == ""
    ) {
      alert("No field can be empty");
      return;
    }
    dispatch(
      createPost(title!.current!.value, contents!.current!.value, username!)
    );
    handleClose();
  };

  const handleTagSelect = (event: any) => {
    setSelectedTags(event.target.value as string[]);
  };

  //grabs current post to be edited

  const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }

    dispatch(fetchAllTags());
  }, [open]);

  const DialogContent = withStyles((theme: Theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const DialogActions = withStyles((theme: Theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  const title = React.useRef<HTMLInputElement>(null);
  const contents = React.useRef<HTMLInputElement>(null);

  const renderTags = () => {
    if (tagsState.isLoading) {
      return <div>Loading...</div>
    } else if (tagsState.isError) {
      return <div>Error loading tags!</div>
    } else {
      return (
        <FormControl style={{width: '100%'}}>
          <InputLabel id="demo-mutiple-chip-label">Tags</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={selectedTags}
            onChange={handleTagSelect}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} style={{margin: '2'}}/>
                ))}
              </div>
            )}
          >
            {tagsState.allTags.map((tag) => {
              return (
              <MenuItem key={tag.name} value={tag.name}>
                <Checkbox color="primary" checked={selectedTags.includes(tag.name)}/>
                <ListItemText primary={tag.name}/>
              </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      )
    }
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create Post
      </Button>
      <div>
        {open ? (
          <Dialog
            disableBackdropClick
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            className={classes.root}
          >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              <TextField
                id="Title"
                inputRef={title}
                defaultValue={"New Title xyz"}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
              />
            </DialogTitle>
            <DialogContent dividers>
              <TextField
                id="content"
                multiline
                rows={16}
                inputRef={contents}
                defaultValue={"New Body xyz"}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
              />
            </DialogContent>
            <DialogContent dividers>
              
              {renderTags()}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSave} color="primary">
                Submit
              </Button>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
      </div>
    </div>
  );
};

export default CreatePost;
