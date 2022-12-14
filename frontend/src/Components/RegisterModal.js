import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  Grid,
  Alert,
  Collapse,
  IconButton,
  Link,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Stack,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ScrollDialog from "./TermsDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Register({
  registerOpen,
  handleCloseRegister,
  changeToLogin,
}) {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const [alertMessage, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSvrt] = useState("error");
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    passwordConfirmation: yup
      .string("Confirm your password")
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm your password!"),
    terms: yup.boolean().oneOf([true], "Please sign terms and conditions"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      terms: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      const tempValues = { ...values };

      setLoading(true);
      setAlertMsg("");
      setAlertOpen(false);

      fetch("/auth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempValues),
      })
        .catch((err) => {
          console.log(err);
          actions.resetForm();
          setLoading(false);
          return;
        })
        .then((result) => {
          if (!result || !result.ok || result.status >= 400) {
            actions.resetForm();
            setLoading(false);
            return;
          }
          return result.json();
        })
        .then((data) => {
          if (!data) {
            actions.resetForm();
            setLoading(false);
            return;
          }

          setUser({ ...data });

          if (data.status) {
            actions.resetForm();
            setLoading(false);
            setAlertMsg(data.status);
            setAlertOpen(true);
            setAlertSvrt("error");
          } else if (data.authenticated) {
            setAlertMsg("Registration succeeded!");
            setAlertOpen(true);
            setAlertSvrt("success");
            navigate("/household");
          }
        });
    },
  });

  const allowHandleClose = () => {
    if (!loading) {
      setAlertOpen(false);
      handleCloseRegister();
      formik.handleReset();
    }
  };

  const handleChangeToLogin = () => {
    setAlertOpen(false);
    formik.handleReset();
    changeToLogin();
  };

  return (
    <Dialog
      open={registerOpen}
      onClose={allowHandleClose}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <Grid item>
            <h1>Register</h1>
          </Grid>
        </Grid>

        <Collapse in={alertOpen}>
          <Alert
            severity={alertSeverity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {alertMessage}
          </Alert>
        </Collapse>

        <form id="registerForm" onSubmit={formik.handleSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                disabled={loading}
                type="email"
                id="email"
                label="Email"
                placeholder="Email Address"
                fullWidth
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.target.blur();
                  }
                }}
                {...formik.getFieldProps("email")}
              />
            </Grid>
            <Grid item>
              <TextField
                disabled={loading}
                type="password"
                id="password"
                label="Password"
                placeholder="Password"
                fullWidth
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.target.blur();
                  }
                }}
                {...formik.getFieldProps("password")}
              />
            </Grid>
            <Grid item>
              <TextField
                disabled={loading}
                type="password"
                id="passwordConfirmation"
                label="Confirm Password"
                placeholder="Confirm Password"
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
            <Grid item>
              <Stack direction="row" alignItems="center" gap={0} marginLeft={1}>
                <FormControlLabel
                  error={formik.errors.terms}
                  control={
                    <Checkbox
                      checked={formik.values.terms}
                      onChange={formik.handleChange}
                      name="terms"
                    />
                  }
                />
                <ScrollDialog />
              </Stack>
              <FormHelperText
                error={formik.touched.terms && formik.errors.terms}
              >
                {formik.touched.terms && formik.errors.terms}
              </FormHelperText>
            </Grid>
          </Grid>
        </form>

        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={0.65}
          sx={{ marginTop: 2 }}
        >
          <Grid item alignItems="center" justifyContent="center">
            or
          </Grid>
          <Grid item alignItems="center" justifyContent="center">
            <Link
              component="button"
              variant="body1"
              onClick={handleChangeToLogin}
              underline="always"
              style={{ color: "#626E60" }}
            >
              Log in
            </Link>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={allowHandleClose}
          disabled={loading}
          style={{ color: "#626E60" }}
        >
          Cancel
        </Button>
        <Button
          form="registerForm"
          type="submit"
          disabled={loading}
          style={{ color: "#626E60" }}
        >
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
}
