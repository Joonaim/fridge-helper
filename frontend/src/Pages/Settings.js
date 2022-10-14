import React from "react";
import { Divider, IconButton, Typography, Stack, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

import { useUserContext } from "../Components/UserContext";

//looks bad on mobile, styling could be improved

const Settings = () => {
  const { user } = useUserContext();

  return (
    <>
      <Stack direction="row" alignItems="center" gap={0}>
        <PersonIcon />
        <Typography variant="body1">{user.email}</Typography>
      </Stack>
      <Divider></Divider>
      <Grid container alignItems="center" direction="row" spacing={2}>
        <Grid item xs={2}>
          <Typography variant="body1">General</Typography>
        </Grid>
        <Grid item>
          <IconButton component={Link} to="/general">
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider></Divider>
      <Grid container alignItems="center" direction="row" spacing={2}>
        <Grid item xs={2}>
          <Typography variant="body1">Manage households</Typography>
        </Grid>
        <Grid item>
          <IconButton component={Link} to="/managehouseholds">
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider></Divider>
      <Grid container alignItems="center" direction="row" spacing={2}>
        <Grid item xs={2}>
          <Typography variant="body1">Terms and conditions</Typography>
        </Grid>
        <Grid item>
          <IconButton component={Link} to="/terms">
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider></Divider>
      <Grid container alignItems="center" direction="row" spacing={2}>
        <Grid item xs={2}>
          <Typography variant="body1">FAQ</Typography>
        </Grid>
        <Grid item>
          <IconButton component={Link} to="/faq">
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider></Divider>
    </>
  );
};

export default Settings;
