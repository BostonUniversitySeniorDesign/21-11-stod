import React from "react";
import clsx from "clsx";
import ListItem from "@material-ui/core/ListItem";
import { withStyles, WithStyles } from "@material-ui/core/styles";

interface Props extends WithStyles<typeof styles> {
  children?: React.ReactNode;
  className?: string;
}

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 35,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
};

function CListItem(props: Props) {
  const { classes, children, className, ...other } = props;

  return (
    <ListItem className={clsx(classes.root, className)} {...other}>
      {children || "class names"}
    </ListItem>
  );
}

export default withStyles(styles)(CListItem);
