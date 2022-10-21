import React from "react";
import { Divider, Button, Typography, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

import { useUserContext } from "../Components/UserContext";

const Settings = () => {
  const { user } = useUserContext();

  return (
    <>
      <Email direction="row" alignItems="center" gap={0}>
        <PersonIcon />
        <Typography variant="body1">{user.email}</Typography>
      </Email>
      <Divider />

      <Stack>
        <SettingItem>
          <SettingButton component={Link} to="/general">
            <Typography variant="body1">General</Typography>
            <ArrowForwardIosIcon />
          </SettingButton>
        </SettingItem>

        <Divider />

        <SettingItem>
          <SettingButton component={Link} to="/managehouseholds">
            <Typography variant="body1">Manage households</Typography>
            <ArrowForwardIosIcon />
          </SettingButton>
        </SettingItem>

        <Divider />

        <SettingItem>
          <SettingButton component={Link} to="/terms">
            <Typography variant="body1">Terms and conditions</Typography>
            <ArrowForwardIosIcon />
          </SettingButton>
        </SettingItem>

        <Divider />

        <SettingItem>
          <SettingButton component={Link} to="/faq">
            <Typography variant="body1">FAQ</Typography>
            <ArrowForwardIosIcon />
          </SettingButton>
        </SettingItem>

        <Divider />
      </Stack>
    </>
  );
};

export default Settings;

const Email = styled(Stack)({
  padding: "8px 12px 8px 12px",
});

const SettingItem = styled("div")({
  padding: "0 12px 0 12px",
});

const SettingButton = styled(Button)({
  display: "grid",
  gridTemplateColumns: "1fr 24px",
  color: "black",
});
