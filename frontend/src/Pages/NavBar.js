import React, { useEffect, useState } from "react";
import { AppBar, IconButton, SwipeableDrawer, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useUserContext } from "../Components/UserContext";

import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';

const navigationLinks = [
  { name: "My Household", to: "/household"},
  { name: "Shopping List", to: "/shopping"},
  { name: "Food Waste", to: "/waste"},
  { name: "Settings", to: "/settings"},
]

const IsActivePath = (to) => {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return isActive
}

function MenuNavigationButton({item, windowSize, closeFunction}) {

    const isActive = IsActivePath(item.to)
    const weight = isActive ? '800' : '600'
    const buttonHeight = ((windowSize.innerHeight * 0.4) / 6) > 30 ? ((windowSize.innerHeight * 0.4) / 6) : 30
    
    return (
        <IconButton component={Link} to={item.to} onClick={closeFunction} variant="text" disableRipple color="inherit" sx={{ lineHeight: '20px', fontSize: '20px', fontWeight: weight, textTransform: 'uppercase', "&:hover": { color: '#626E60' }, "&:active": { color: '#3C3C3C' } }} style={{borderRadius: 0, height: buttonHeight}}>
            {item.name}
        </IconButton>
    )

}

export default function NavBar() {
    
    const [open, setOpen] = useState(false);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const {setUser} = useUserContext()
    const navigate = useNavigate()

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }
    
    useEffect(() => {
        function handleWindowResize() {
        setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
        window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    function logout() {

        fetch("/auth/logout", {
            method: 'DELETE',
            credentials: 'include'
        }).catch(err => {
            console.log(err)
            return
        }).then(result => {
            if (!result || !result.ok || result.status >= 400) {
                console.log('Something went wrong logging out!')
                return
            }
            return result.json()
        }).then(data => {
            if (!data) {
                return
            }
            if (data.authenticated !== null) {
                setUser({ ...data })
                navigate('/', { replace: true })
            }
        })

    }

    return (
        <AppBar position="sticky" elevation={0} color={'transparent'} style={{ margin: 0 }}>

            <Container maxWidth="false">
                <Toolbar disableGutters sx={{ justifyContent: "right" }}>

                    {navigationLinks.filter(item => IsActivePath(item.to)).map((item) => (
                            <Typography key={item.name} variant="text" color="inherit" sx={{ lineHeight: '36px', fontSize: '20px', fontWeight: 600, letterSpacing: '1.25px', textTransform: 'uppercase' }}>
                                {item.name}
                            </Typography> 
                    ))}

                    <IconButton color="inherit" disableRipple onClick={() => setOpen(true)} sx={{ marginLeft: 1 }}>
                    <MenuIcon sx={{fontSize: '40px', "&:hover": { color: '#626E60' }, "&:active": { color: '#3C3C3C' }}} />
                    </IconButton>

                </Toolbar>
            </Container>

            <SwipeableDrawer
                anchor="top"
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
            >
                
                <IconButton onClick={() => setOpen(false)} disableRipple color="inherit" sx={{ marginLeft: "auto"}} style={{height: ((windowSize.innerHeight * 0.4) / 6) > 30 ? ((windowSize.innerHeight * 0.4) / 6) : 30 }}>
                    <ClearIcon sx={{fontSize: '40px', "&:hover": { color: '#626E60' }, "&:active": { color: '#3C3C3C' }}}/>
                </IconButton>

                {navigationLinks.map((item) => (
                    <MenuNavigationButton key={item.name} item={item} windowSize={windowSize} closeFunction={() => setOpen(false)} />
                ))}

                <IconButton variant="text" color="inherit" disableRipple onClick={() => logout()} sx={{ lineHeight: '20px', fontSize: '20px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '15px', "&:hover": { color: '#626E60' }, "&:active": { color: '#3C3C3C' } }} style={{borderRadius: 0, height: ((windowSize.innerHeight * 0.4) / 6) > 30 ? ((windowSize.innerHeight * 0.4) / 6) : 30 }}>
                    Sign Out
                </IconButton>

            </SwipeableDrawer>

        </AppBar>
    )
}
