import React from "react";
import {
  createStyles,
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
import { Card, CardContent, CardHeader, DialogTitle } from "@material-ui/core";
import {usePostContext} from "./PostContext"
import Post from "./Post"

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
}

const CustomizedDialogs: React.FC<Props> = ({ resetOptionState }) => {
  const [open, setOpen] = React.useState(true);

  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setScroll(scrollType);
    setOpen(true);
  };
  const handleClose = () => {
    resetOptionState();
    setOpen(false);
  };
  const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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

  const {selectedPost} = usePostContext();

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      {/* <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Editing Pos
        </DialogTitle> */}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        scroll={scroll}
        open={open}
      >
          
       {/* <Post post={selectedPost!} showPostMenu={false}></Post> */}
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {selectedPost?.title}
        </DialogTitle>
        
        <DialogContent dividers>
        <form><textarea>{selectedPost?.contents}</textarea></form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CustomizedDialogs;
