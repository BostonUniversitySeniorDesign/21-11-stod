import React from "react";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { sendRequest } from "../../actions/friendActions";
import { useSelector, useDispatch } from "react-redux";
import { IRootState, IFriendObj } from "../../actions/types";

interface Props {
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  anchorEl: HTMLButtonElement | null;
  user: string;
}

function isActiveReq(
  fr_list: IFriendObj[],
  other_user: string,
  curr_user: string | undefined
) {
  let dis, text;
  if (
    !fr_list.some((f) => f.reciver === other_user || f.sender === other_user)
  ) {
    dis = false;
    text = "Send friend request";
  } else
    fr_list.forEach((f) => {
      if (f.is_active && f.reciver === other_user) {
        dis = true;
        text = "Waiting for friend request response";
      } else if (f.is_active && f.reciver === curr_user) {
        dis = true;
        text = "Respond to friend request";
      } else if (!f.is_active && !f.declined) {
        dis = true;
        text = "Friend";
      } else {
        dis = false;
        text = "Send friend request";
      }
    });
  return { dis, text };
}

export const UserProfile: React.FC<Props> = ({
  anchorEl,
  setAnchorEl,
  user,
}) => {
  //   const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
  //     null
  //   );
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  let friends = useSelector((state: IRootState) => state.friends);
  let currentUser = useSelector(
    (state: IRootState) => state.auth.user?.username
  );

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography>{user}</Typography>
        <Button
          onClick={() => {
            dispatch(sendRequest(user));
          }}
          disabled={isActiveReq(friends.friend_req, user, currentUser).dis}
        >
          {isActiveReq(friends.friend_req, user, currentUser).text}
        </Button>
      </Popover>
    </div>
  );
};
