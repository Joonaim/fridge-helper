import React from "react";
import { Divider, Button, Typography, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

import { useUserContext } from "../Components/UserContext";

const Settings = () => {
  const { user } = useUserContext();

  const settingItems = [
    { text: "General", route: "general" },
    { text: "Manage households", route: "managehouseholds" },
    { text: "Terms and conditions", route: "terms" },
    { text: "FAQ", route: "faq" },
  ];

  return (
    <>
      <Email direction="row" alignItems="center" gap={0}>
        <PersonIcon sx={{marginRight: 0.5}} />
        <Typography variant="text"
        sx={{
            lineHeight: "20px",
            fontSize: "16px",
            fontWeight: 300,
            letterSpacing: "1px",
            }}
        >{user.email}</Typography>
      </Email>
      <Divider />

      <Stack>
        <SettingItem key={"Back to My Household"}>
            <HouseholdButton startIcon={<ArrowBackIosIcon />} component={Link} to={`/household`}>
            
              <Typography variant="text"
              sx={{
                lineHeight: "36px",
                fontSize: "20px",
                fontWeight: 400,
                letterSpacing: "1.25px",
                }}
              >Back to My Household</Typography>
            </HouseholdButton>
            <Divider />
        </SettingItem>
        {settingItems.map((item) => (
          <SettingItem key={item.text}>
            <SettingButton component={Link} to={`/${item.route}`}>
              <Typography variant="text"
              sx={{
                lineHeight: "36px",
                fontSize: "20px",
                fontWeight: 400,
                letterSpacing: "1.25px",
                }}
              >{item.text}</Typography>
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

const HouseholdButton = styled(Button)({
  display: "grid",
  gridTemplateColumns: "24px 1fr",
  color: "black",
});
