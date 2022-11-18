import React from "react";
import {Box, Typography, Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import Login from "../Components/LoginModal";
import Register from "../Components/RegisterModal";
import PrimaryButtonStyled from "../Components/PrimaryButtonStyled";
import styled from "styled-components";
import breakpoint from '../Components/breakpoints';

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
        "",
      bgcolor: "#626E60",
      text: "From the household menu you can easily see and manage the contents of your fridge.",
    },
  ];

  return (
    <div>
      <TitleContainer>
      <Title> FRIDGE HELPER</Title>
      <Subtitle >
        Helps You To Organize Your Fridge!
      </Subtitle>
</TitleContainer>
      <Slider>
        {items.map((item) => {
          return (
            <SliderGrid
              container
              direction="column"
              columns={1}
              justifyContent="center"
              alignItems="center"
              sx={{ backgroundColor: item.bgcolor }}
              key={item.index}
            >
              <Image
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
            </SliderGrid>
          );
        })}
      </Slider>

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

      <Footer>
        <PrimaryButtonStyled variant="outlined" onClick={handleOpenLogin}>
          SIGN IN
        </PrimaryButtonStyled>
        <Typography sx={{ pl: 3, pr: 3, mt: 2 }}>OR</Typography>
        <PrimaryButtonStyled variant="outlined" onClick={handleOpenRegister}>
          CREATE ACCOUNT
        </PrimaryButtonStyled>
      </Footer>
    </div>
  );
}

const TitleContainer = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
align-items: center;
text-align: center;
height: 10vh;
@media only screen and ${breakpoint.device.sm}{
  padding-top: 3rem;
  margin-top: 1rem;
}
`

const Title = styled.h1`
font-family: Open Sans;
font-style: normal;
font-weight: 600;
font-size: 24px;
margin: 0;
line-height: 36px;
letter-spacing: 1.25px;
@media only screen and ${breakpoint.device.sm}{
  font-size: 36px
}
`

const Subtitle = styled.h3`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 36px;
  margin: 0;
  letter-spacing: 0.25px;
`

const Slider = styled(Carousel)`
  width: 100%;
  height: 70vh;
  margin-bottom: 1rem;
`

const SliderGrid = styled(Grid)`
  height: 70vh
`

const Image = styled(Box)`
  height: 50vh
`

const Footer = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding-bottom: 1rem;
  @media only screen and ${breakpoint.device.sm}{
    margin-top: 3rem;
  }
`

