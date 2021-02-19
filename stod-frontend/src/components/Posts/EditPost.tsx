import React from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { usePostContext } from "./PostContext";
import { DialogContentText, TextField } from "@material-ui/core";
import { editPost, deletePost } from "../../actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, IPost } from "../../actions/types";
import DialogTitle from "@material-ui/core/DialogTitle";

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

interface Props {
  //  foo: (x: string) => void; //foo function, takes in x, returns void
  resetOptionState: () => void;
  optionSelection: string;
}

const EditPost: React.FC<Props> = ({ resetOptionState, optionSelection }) => {
  const [open, setOpen] = React.useState(true);

  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  //handles closing, which will reset the context of the selectedPost
  const handleClose = () => {
    resetOptionState();
    setOpen(false);
  };

  let currentState = useSelector((state: IRootState) => state.posts);
  const dispatch = useDispatch();

  //grabs current post to be edited
  const { selectedPost } = usePostContext();

  //saves post edits
  const handleSave = () => {
    if(value!.current!.value === null || value!.current!.value === ""){
      alert("Post cannot be empty");
      return;
    }
    selectedPost!.contents = value.current!.value;
    dispatch(editPost(selectedPost!.id, value.current!.value));
    handleClose();
  };

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

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        "& .MuiTextField-root": {
          margin: theme.spacing(1),
          width: 500,
        },
      },
    })
  );

  const classes = useStyles();

  const value = React.useRef<HTMLInputElement>(null);

  //handles delete option opening and closing
  const [deleteOpen, setDeleteOpen] = React.useState(true);

  //resets option state
  const handleDeleteClose = () => {
    resetOptionState();
    setDeleteOpen(false);
  };

  //upon confirmation of deletion will send dispatch to remove from backend
  const handleDeleteConfirm = () => {
    dispatch(deletePost(selectedPost!.id));
    handleDeleteClose();
  };

  return (
    <div>
      {optionSelection === "Edit" ? (
        <Dialog
          disableBackdropClick
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          scroll={scroll}
          open={open}
          className={classes.root}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {selectedPost?.title}
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              id="outlined-multiline-flexible"
              multiline
              rows={16}
              inputRef={value}
              defaultValue={selectedPost?.contents}
              // value={value}
              // onChange={(e) => setValue(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave} color="primary">
              Save changes
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={deleteOpen}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableBackdropClick
        >
          <DialogTitle id="customized-dialog-title" onClose={handleDeleteClose}>
            {"Are you sure you want to delete this post?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose} color="primary" autoFocus>
              No
            </Button>
            <Button onClick={handleDeleteConfirm} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};
export default EditPost;
