import { Menu, MenuItem } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IPost, IRootState } from "../../actions/types";
import { IconButton } from "@material-ui/core";
import MoreVertSharpIcon from "@material-ui/icons/MoreVertSharp";


import { usePostContext } from "./PostContext";

import EditPost from "./EditPost";

const PostMenu: React.FC<{ post: IPost }> = ({ post }) => {
  const user = useSelector((state: IRootState) => state.auth.user?.username);
  //lets you use the data that the context has
  const { selectedPost, setSelectedPost } = usePostContext();

  //   const useStyles = makeStyles((theme) => ({
  //     button: {
  //       display: "block",
  //       marginTop: theme.spacing(2),
  //     },
  //     formControl: {
  //       margin: theme.spacing(1),
  //       minWidth: 120,
  //     },
  //   }));

  // const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  //   const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    option: string
  ) => {
    setOptionSelection(option);
    setSelectedPost(post);
    setAnchorEl(null);
  };
  const [optionSelection, setOptionSelection] = React.useState<null | string>(
    null
  );

  const options = ["Edit", "Delete"];

  const resetOptionState = () => {
    setOptionSelection(null);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <Typography
        variant="body2"
        color="textSecondary"
        style={{ textAlign: "right" }}
      > */}
      {/* User: {poster}
      </Typography>
      {poster === user ? <>Poster"</> : <>Non-Poster</>} */}
      {/* <div className="menu-container"> */}
      <IconButton
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          setAnchorEl(event.currentTarget)
        }
      >
        <MoreVertSharpIcon></MoreVertSharpIcon>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {options.map((option, index) => (
          <MenuItem
            // disabled={index === 0}
            // selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      {optionSelection === "Edit" ? (
        <div>
          <EditPost
            optionSelection={optionSelection}
            resetOptionState={resetOptionState}
          ></EditPost>
        </div>
      ) : null}
      {optionSelection === "Delete" ? (
        <div>
          <EditPost
            optionSelection={optionSelection}
            resetOptionState={resetOptionState}
          ></EditPost>
        </div>
      ) : null}
    </>
  );
};

export default PostMenu;
