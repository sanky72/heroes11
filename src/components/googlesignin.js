import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loadUser } from "../actions/userAction";
import { URL } from "../constants/userConstants";
import { jwtDecode } from "jwt-decode";
import { login } from "../actions/userAction";

export default function Logingoogle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const [jwt, setJwt] = useState("");
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      navigate("/register", { state: { jwt, authenticationType: "oauth" } });
      // window.store.dispatch(showToast("Error", "error"));
    }
  }, [user, isAuthenticated, error]);

  const onGoogleSuccess = async (response) => {
    console.log(response, "response");
    const jwt = response.credential;
    setJwt(jwt);
    const { email } = jwtDecode(jwt);
    sessionStorage.setItem("jwt", jwt);
    dispatch(
      login({
        email,
        authDetails: { authenticationType: "oauth", jwt },
      })
    );
    // if (loginResponse.code !== 200) {
    //   sessionStorage.setItem("jwt", jwt);
    //   history("/register", { state: { jwt, authenticationType: "oauth" } });
    // }

    // console.log("access token", access_token);
    // console.log("jwt destructure", jwtDecode(access_token));
    // console.log("name", jwtDecode(access_token).name);
    // const { data } = await axios.post(`${URL}/auth/googlelogin`, {
    //   tokenId: access_token,
    // });
    // localStorage.setItem("token", data.server_token);
    // dispatch(loadUser());
    // history("/");
  };

  const onGoogleFailure = (err) => {
    console.log(err);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#151a30",
        color: "white",
      }}
    >
      <GoogleOAuthProvider clientId="524341840994-eg71u6e8soei0j5cid8r8iojrmh13qf6.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("login is successfull");
            onGoogleSuccess(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
            onGoogleFailure("err");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
}
