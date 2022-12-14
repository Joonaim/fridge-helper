import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import * as yup from "yup";
import BackButton from "../Components/BackButton";
import { useUserContext } from "../Components/UserContext";
import { useState } from "react";
import { useFormik } from "formik";
import { Grid, Stack, Alert } from "@mui/material";
import axios from "axios";

import PrimaryButtonStyled from "../Components/PrimaryButtonStyled";

const General = () => {
  const { user } = useUserContext();
  const [textFieldInput, setTextFieldinput] = useState(user.email);
  const [msg, setMsg] = useState(null);
  const [msgId, setMsgId] = useState(null);

  const validateEmail = () => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(textFieldInput)) {
      return true;
    }
    return false;
  };

  const notificate = (message, severity = "error") => {
    clearTimeout(msgId);
    setMsg(<Alert severity={severity}>{message}</Alert>);
    setMsgId(
      setTimeout(() => {
        setMsg(null);
      }, 5000)
    );
  };

  const validationSchema = yup.object({
    currentPassword: yup
      .string("Enter current password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    password: yup
      .string("Enter new password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    passwordConfirmation: yup
      .string("Repeat new password")
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm your password!"),
  });

  const handleTextFieldChange = (event) => {
    event.preventDefault();
    setTextFieldinput(event.target.value);
  };

  const submitNewUsername = async () => {
    if (!validateEmail()) {
      notificate("Username must be email");
      return;
    }
    if (user.email == textFieldInput) {
      return;
    }
    try {
      await axios.put(
        `api/users/edit/${user.id}`,
        { username: textFieldInput },
        {
          withCredentials: true,
        }
      );
    } catch (e) {
      notificate("Error while trying to change username");
      return;
    }
    user.email = textFieldInput;
    notificate("Username changed succesfully", "success");
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "/auth/login",
          { email: user.email, password: values.currentPassword },
          {
            withCredentials: true,
          }
        );
        if (!res.data.authenticated) {
          notificate("Invalid current password");
          return;
        }
      } catch (e) {
        console.log(e);
      }
      try {
        await axios.put(
          `api/users/edit/${user.id}`,
          { username: user.email, password: values.password },
          {
            withCredentials: true,
          }
        );
      } catch (e) {
        console.log(e);
      }
      notificate("Password changed succesfully", "success");
      formik.handleReset();
    },
  });

  return (
    <div style={{ padding: "0 12px" }}>
      <Link to="/settings" style={{ textDecoration: "none" }}>
        <BackButton />
      </Link>
      <h2>General Settings</h2>
      {msg}
      <h4>Set New Password</h4>
      <form id="changePasswordForm" onSubmit={formik.handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              type="password"
              id="currentPassword"
              label="Current Password"
              placeholder="Current Password"
              fullWidth
              error={
                formik.touched.currentPassword &&
                Boolean(formik.errors.currentPassword)
              }
              helperText={
                formik.touched.currentPassword && formik.errors.currentPassword
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.target.blur();
                }
              }}
              {...formik.getFieldProps("currentPassword")}
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              id="password"
              label="New Password"
              placeholder="New Password"
              fullWidth
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.target.blur();
                }
              }}
              {...formik.getFieldProps("password")}
            />
          </Grid>
          <Grid item marginBottom={1}>
            <TextField
              type="password"
              id="passwordConfirmation"
              label="Confirm Password"
              placeholder="Confirm New Password"
              fullWidth
              error={
                formik.touched.passwordConfirmation &&
                Boolean(formik.errors.passwordConfirmation)
              }
              helperText={
                formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.target.blur();
                }
              }}
              {...formik.getFieldProps("passwordConfirmation")}
            />
          </Grid>
        </Grid>
        <PrimaryButtonStyled type="submit" form="changePasswordForm">
          Change password
        </PrimaryButtonStyled>
      </form>
      <h4>Set New Username</h4>
      <Stack direction="row" alignItems="center" gap={1}>
        <TextField
          error={!validateEmail()}
          label="email"
          defaultValue={user.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleTextFieldChange(e)}
        ></TextField>
        <PrimaryButtonStyled onClick={submitNewUsername}>
          Change Username
        </PrimaryButtonStyled>
      </Stack>
    </div>
  );
};

export default General;
