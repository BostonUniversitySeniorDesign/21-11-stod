import React from "react";
import clsx from "clsx";
import { Button, ButtonProps } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/core/styles";

interface Props extends WithStyles<typeof styles> {
  children?: React.ReactNode;
  className?: string;
  fullWidth?: boolean | undefined;
  type?: "button" | "reset" | "submit" | undefined;
  startIcon?: React.ReactNode;
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  variant?: "text" | "outlined" | "contained" | undefined;
  color?: "inherit" | "default" | "primary" | "secondary" | undefined;
}

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: "linear-gradient(to right, #373b44, #4286f4)",
    borderRadius: 100,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "0px 0px 17px 0px rgba(1, 87, 155, 0.62); !important",
    },
  },
};

function ClassNames(props: Props) {
  const { classes, children, className, ...other } = props;

  return (
    <Button className={clsx(classes.root, className)} {...other}>
      {children || "class names"}
    </Button>
  );
}

export default withStyles(styles)(ClassNames);
