import "./register.css";

import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { showToast } from "../actions/toastAction";
import { LOGIN_SUCCESS, URL } from "../constants/userConstants";
import Otp from "./otp";
import { jwtDecode } from "jwt-decode";

const isOauth = (authenticationType) => authenticationType === "oauth";

const extractFromJwt = ({ jwt, authenticationType }) => {
  if (authenticationType !== "oauth") {
    return {};
  }
  const { name, email } = jwtDecode(jwt);
  return { name, email };
};

const getValidationSchema = (authenticationType) => {
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(6, "Name must be at least 6 characters")
      .max(20, "Name must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    phoneInput: Yup.string(),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(/^[0-9+-]+$/, "It must be in numbers")
      .min(10, "Phone Number must be at least 10 characters")
      .max(10, "Phone Number must not exceed 10 characters"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
  });

  if (!isOauth(authenticationType)) {
    validationSchema = Yup.object().shape({
      name: Yup.string()
        .default("john")
        .required("Name is required")
        .min(6, "Name must be at least 6 characters")
        .max(20, "Name must not exceed 20 characters"),
      email: Yup.string()
        .default("test")
        .required("Email is required")
        .email("Email is invalid"),
      phoneInput: Yup.string(),
      phoneNumber: Yup.string()
        .required("Phone Number is required")
        .matches(/^[0-9+-]+$/, "It must be in numbers")
        .min(10, "Phone Number must be at least 10 characters")
        .max(10, "Phone Number must not exceed 10 characters"),
      acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters"),
    });
  }

  return validationSchema;
};

export function Register() {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const { jwt, authenticationType } = location.state || {};

  const [err, setErr] = useState();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getValidationSchema(authenticationType)),
    defaultValues: extractFromJwt({ jwt, authenticationType }),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      window.store.dispatch(showToast(error, "error"));
    }
  }, [user, isAuthenticated, error]);

  console.log(errors, "errors");
  const onSubmit = async (formData) => {
    console.log(JSON.stringify(formData, null, 2));
    //e.preventDefault();
    setEmail(formData.email);
    let referralID = localStorage.getItem("referral_id") || "";
    if (referralID === "null") {
      referralID = "";
    }
    const data = await axios.post(`${URL}/user`, {
      ...formData,
      authDetails: { authenticationType, jwt },
      referralID,
    });
    console.log(data);
    if (data.data.code === "00035") {
      window.store.dispatch(showToast(data.data.resultMessage.en));
      dispatch({ type: LOGIN_SUCCESS, payload: data.data.user });
      // const referralID = localStorage.getItem("referral_id");
      // const data = await axios.post(`${URL}/processReferral`, {
      //   referralID,
      // });
      localStorage.setItem("token", data.data.confirmToken);
    } else {
      window.store.dispatch(showToast(data.data.resultMessage.en, "error"));
      setErr(data.data.resultMessage.en);
    }
  };

  const handleotp = async () => {
    try {
      const data = await axios.post(`${URL}/auth/otp`, {
        email,
        otp,
      });
      setErr(data.data.message);
      localStorage.setItem("token", data.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: data.data.user });
      window.store.dispatch(showToast(data.data.resultMessage.en));
    } catch (e) {
      window.store.dispatch(showToast(e, "error"));
    }
  };

  return (
    <>
      <div className="registertopbar">
        <ArrowBackIcon
          style={{ marginRight: "20px" }}
          onClick={() => navigate(-1)}
        />
        register & play
      </div>

      <div className="register">
        <Paper style={{ padding: "5px 5px" }}>
          <form onSubmit={handleSubmit(onSubmit)} className="registerform">
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              variant="standard"
              fullWidth
              margin="dense"
              disabled={isOauth(authenticationType)}
              {...register("email")}
              error={errors.email ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.email?.message}
            </Typography>
            <TextField
              required
              id="name"
              name="name"
              label="Name"
              variant="standard"
              fullWidth
              margin="dense"
              {...register("name")}
              disabled={isOauth(authenticationType)}
              error={errors.name ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.name?.message}
            </Typography>
            <TextField
              required
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              variant="standard"
              fullWidth
              margin="dense"
              autoFocus={isOauth(authenticationType)}
              {...register("phoneNumber")}
              error={errors.phoneNumber ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.phoneNumber?.message}
            </Typography>
            {!isOauth(authenticationType) && (
              <>
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  variant="standard"
                  fullWidth
                  margin="dense"
                  {...register("password")}
                  error={errors.password ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.password?.message}
                </Typography>
              </>
            )}
            <Button
              variant="contained"
              type="submit"
              disableElevation
              style={{ backgroundColor: "#24B937" }}
            >
              Register
            </Button>
          </form>
          <Link to="/forgot-password">forgot password</Link>
        </Paper>
        <Link to="/login">Aleady a user?Log in</Link>
      </div>
      <Otp
        open={open}
        setOpen={setOpen}
        otp={otp}
        setOtp={setOtp}
        handleotp={handleotp}
        err={err}
      />
    </>
  );
}

export default Register;
