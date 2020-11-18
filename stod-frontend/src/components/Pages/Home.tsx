import React from "react";
import { logout } from "../../actions/authActions";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Home</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(logout())}
      >
        Logout
      </Button>
    </div>
  );
};
export default Home;
