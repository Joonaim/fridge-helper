import React from 'react';
import { BottomNavigation, Box, Button, Typography, Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Login from './Login';
import Register from './Register';


export default function Landing() {
    const [loginOpen, setLoginOpen] = React.useState(false)
    const [registerOpen, setRegisterOpen] = React.useState(false)

    const handleOpenLogin = () => {
        setLoginOpen(true)
        setRegisterOpen(false)
    }

    const handleOpenRegister = () => {
        setRegisterOpen(true)
        setLoginOpen(false)
    }
  
    const handleCloseLogin = () => {
        setLoginOpen(false)
    }

    const handleCloseRegister = () => {
        setRegisterOpen(false)
    }

    const items = [
      {
        index: 1,
        name: 'esimerkki1',
        media: 'https://mario.wiki.gallery/images/f/fb/Sticker_Mushroom_-_Mario_Party_Superstars.png',
        bgcolor: 'green',
        text: 'mushroom taste good ipsum dipsum lorem solem more text vesihiisi hississä sihisi'
      },
      {
        index: 2,
        name: 'esimerkki2',
        media: 'https://static-cdn.jtvnw.net/jtv_user_pictures/6cadbaf3-ffdf-4e6c-8629-2a54ad250193-profile_image-300x300.png',
        bgcolor: 'red',
        text: 'you got gnomed ipsum dipsum lorem solem more text ärrän kierrän orren ympäri fox fence something quick'
      }
    ]
  
    return (
      <div>
        <Typography align="center" variant="h4"> FRIDGE HELPER </Typography>
        <Typography align="center" variant="h6"> Helps You To Organize Your Fridge! </Typography>

        <Carousel>
          {items.map(item => {
            return(
            <Grid 
              container 
              direction="column" 
              columns={1} 
              justifyContent="center"
              alignItems="center"
              sx={{ backgroundColor: item.bgcolor }} 
              key={item.index}>
              <Box
                component="img"
                sx={{
                  width: '50%',
                  height: 400
                }}
                src={item.media}
              />
              <Typography align="center">{item.text}</Typography>
            </Grid>
            )}
          )}
        </Carousel>

        <Login loginOpen={loginOpen} handleCloseLogin={handleCloseLogin} changeToRegister={handleOpenRegister} />
        <Register registerOpen={registerOpen} handleCloseRegister={handleCloseRegister} changeToLogin={handleOpenLogin}/>
        
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
    )
}
