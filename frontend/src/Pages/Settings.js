import React from "react";
import { Divider, Button, Typography, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

import { useUserContext } from "../Components/UserContext";

const Settings = () => {
  const { user } = useUserContext();

  const settingItems = [
    { text: "Back to My Household", route: "household"},
    { text: "General", route: "general" },
    { text: "Manage households", route: "managehouseholds" },
    { text: "Terms and conditions", route: "terms" },
    { text: "FAQ", route: "faq" },
  ];

  return (
    <>
      <Email direction="row" alignItems="center" gap={0}>
        <PersonIcon />
        <Typography variant="body1">{user.email}</Typography>
      </Email>
      <Divider />

      <Stack>
        {settingItems.map((item) => (
          <SettingItem key={item.text}>
            <SettingButton component={Link} to={`/${item.route}`}>
              <Typography variant="body1">{item.text}</Typography>
              <ArrowForwardIosIcon />
            </SettingButton>
            <Divider />
          </SettingItem>
        ))}
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
