import { Button, Grid, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NoFridges = () => {
  return (
    <Grid container direction="column" justifyContent="center" alignItems={'center'} sx={{padding: 2}} spacing={1}>
        <Grid item>
            <Typography variant="text"
            sx={{
                lineHeight: "20.5px",
                fontSize: "24px",
                fontWeight: 600,
                }}
            >You have no fridges!</Typography>
        </Grid>
        <Grid item>
        <Typography variant="text"
        sx={{
            lineHeight: "20.5px",
            fontSize: "24px",
            fontWeight: 600,
            }}
        >To start using fridge helper</Typography>
        </Grid>
        
        <Grid item>
        <AddButton component={Link} to={`/managehouseholds`}>
            Create your first fridge or join existing one
        </AddButton>
        </Grid>
    </Grid>
  )
}

export default NoFridges;

const AddButton = styled(Button)({
    color: "#626E60",
    border: "1px solid #626E60",
    textDecoration: "none",
    fontFamily: "Open sans",
    fontSize: "18px",
    "&:hover": {
      color: "#384036",
      border: "1px solid #384036",
      background: "white",
    },
  });
