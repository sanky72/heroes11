import "./register.css";

import styled from "@emotion/styled";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { showToast } from "../actions/toastAction";
import { login } from "../actions/userAction";

const Err = styled.p`
  color: red;
`;

export function Login() {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      window.store.dispatch(showToast("Error", "error"));
    }
  }, [user, isAuthenticated, error]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const formdata = { email, password };
    dispatch(login(formdata));
  };
  return (
    <>
      <div className="logintopbar">
        <EmojiEventsOutlinedIcon style={{ marginRight: "1vw" }} />
        Heroes 11
      </div>

      <div className="register">
        <Paper style={{ padding: "2vh 2vw" }}>
          <h5 style={{ marginBottom: "10px" }}>LOG IN & PLAY</h5>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#FFFFFF",
                color: "black",
                width: "50%",
                marginRight: "1vw",
                height: "30px",
              }}
              onClick={() =>
                window.store.dispatch(
                  showToast(
                    "Not working yet,only google login is working",
                    "error"
                  )
                )
              }
            >
              <img src="./github.svg" alt="" />
              Github
            </Button>
            <Button
              variant="contained"
              elevation="2"
              style={{
                backgroundColor: "#FFFFFF",
                color: "black",
                width: "50%",
                height: "30px",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => navigate("/googlelogin")}
            >
              <img src="./google.svg" alt="" style={{ marginRight: "5px" }} />
              Google
            </Button>
          </div>
          <form onSubmit={handlesubmit} className="loginform">
            <TextField
              id="fullWidth"
              defaultValue="Hello World"
              variant="standard"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />

            <TextField
              id="fullWidth"
              defaultValue="Hello World"
              variant="standard"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              className="itseveryday"
              variant="contained"
              disableElevation
              style={{ backgroundColor: "#24B937" }}
            >
              Log in
            </Button>
          </form>
          <Link to="/forgot-password">forgot password</Link>
          <Link to="/register">Dont have a account?Sign up</Link>
        </Paper>
      </div>
    </>
  );
}

export default Login;
