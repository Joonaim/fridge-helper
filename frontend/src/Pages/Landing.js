import React from "react";
import { BottomNavigation, Box, Button, Typography, Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Login from "../Components/LoginModal";
import Register from "../Components/RegisterModal";

export default function Landing() {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);

  const handleOpenLogin = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };

  const handleOpenRegister = () => {
    setRegisterOpen(true);
    setLoginOpen(false);
  };

  const handleCloseLogin = () => {
    setLoginOpen(false);
  };

  const handleCloseRegister = () => {
    setRegisterOpen(false);
  };

  const items = [
    {
      index: 1,
      name: "esimerkki1",
      media:
        "https://www.lifepng.com/wp-content/uploads/2020/11/Vintage-Refrigerator-png-hd.png",
      bgcolor: "#945D60",
      text: "It's true, Fridge helper will help you save money and nature. Less food waste, less headache. Amazing. Get started today.",
    },
    {
      index: 2,
      name: "esimerkki2",
      media:
        "https://s3-alpha-sig.figma.com/img/07db/e0bd/d7e3918e89a97bf33189f6c3a35b9094?Expires=1667174400&Signature=Shmsd7UvHCYoJLujOAeqUpJm3ZVuPlLag1R95ZyYXaJL7wwoLT-SSIN0AR4757G-dcHajsCz1uIfIS3Y16Q2m7yaKmg36mN-yPddpxyabY73BSyY-wCeAF8EHo8kxQvEw3GXJnraOy5wAia-9pJUyWJUgSQPr2Mwgy6l1yg53k7DFs3XwccH5flrd-~sEKJyA~Fq4ZkmkYCe17wnWORz~Un5YXncnhQ1qtjincCW~5oU4BlJWP3TWSE13GkyWr9e-OAIwYQSV2zK6cIuDkY-7dh3rKoDpw4C487K6TIOD7Ge3e22QOMP-QixLkW3e5K1MhCMQ0OFPgKr68uULOd1mA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      bgcolor: "#626E60",
      text: "From the household menu you can easily see and manage the contents of your fridge.",
    },
  ];

  return (
    <div>
      <Typography align="center" variant="h4">
        {" "}
        FRIDGE HELPER{" "}
      </Typography>
      <Typography align="center" variant="h6">
        {" "}
        Helps You To Organize Your Fridge!{" "}
      </Typography>

      <Carousel>
        {items.map((item) => {
          return (
            <Grid
              container
              direction="column"
              columns={1}
              justifyContent="center"
              alignItems="center"
              sx={{ backgroundColor: item.bgcolor }}
              key={item.index}
            >
              <Box
                component="img"
                sx={{
                  maxHeight: 400,
                }}
                src={item.media}
              />
              <Typography
                align="center"
                sx={{
                  fontFamily: "Open Sans",
                  color: "#FFFFFF",
                  fontSize: "22",
                }}
              >
                {item.text}
              </Typography>
            </Grid>
          );
        })}
      </Carousel>

      <Login
        loginOpen={loginOpen}
        handleCloseLogin={handleCloseLogin}
        changeToRegister={handleOpenRegister}
      />
      <Register
        registerOpen={registerOpen}
        handleCloseRegister={handleCloseRegister}
        changeToLogin={handleOpenLogin}
      />

      <BottomNavigation>
        <Button variant="outlined" onClick={handleOpenLogin}>
          SIGN IN
        </Button>

        <Typography sx={{ pl: 3, pr: 3, mt: 2 }}>OR</Typography>

        <Button variant="outlined" onClick={handleOpenRegister}>
          CREATE ACCOUNT
        </Button>
      </BottomNavigation>
    </div>
  );
}
