import React from 'react';
import Button from '@mui/material/Button';
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
  
    return (
      <div>

        <Login loginOpen={loginOpen} handleCloseLogin={handleCloseLogin} changeToRegister={handleOpenRegister} />
        <Register registerOpen={registerOpen} handleCloseRegister={handleCloseRegister} changeToLogin={handleOpenLogin}/>

        <Button variant="outlined" onClick={handleOpenLogin}>
          Log in
        </Button>

        <Button variant="outlined" onClick={handleOpenRegister}>
          Register
        </Button>

      </div>
    )
}
