import { useState, useEffect} from "react";
import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// Acts weird on mobile, needs to be fixed, menu's button lenght needs to be fixed

const SelectFridge = ({fridges, currentFridge, setCurrentFridge}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(()=>{
        if (!currentFridge){
            setCurrentFridge(fridges[0]);
        }
    },[currentFridge])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
        setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
  
    return (
        <>
            <HouseholdButton aria-describedby={id} variant="contained" size="large" onClick={handleClick}>
                {currentFridge?.name}
                {!open ? <ExpandMoreIcon fontSize="medium"/> : <ExpandLessIcon fontSize="medium"/>}
            </HouseholdButton>
            <PopoverMenu
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                {fridges?.map((fridge)=> ( 
                    <ul key={fridge.id}>
                        <li><Button key={fridge.id} onClick={()=> {setAnchorEl(null); setCurrentFridge(fridge);}}>{fridge.name}</Button> </li>
                    </ul>
                ))}
            </PopoverMenu>
        </>
    );

};

export default SelectFridge;

const HouseholdButton = styled(Button)({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    background: "#626E60",
    fontSize: "18px",
    textAlign:"center",
    lineHeight: "24px",
    padding: "8px 16px 8px 16px",
    gap: "6px",
    "&:hover":{
        background: "#384036"
    }
});

const PopoverMenu = styled(Popover)({
    fontSize: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "0px 17px 0px 10px",

    ul:{
        listStyle: "none",
        margin: "0px",
        padding:"0px",

        li:{
            button:{
                padding: "8px 24px 8px 24px",
                alignItems:"left",
                color: "black",
                fontSize:"18px",

                ":hover":{
                    background:"#E0EEDD"
                }
            }
        }
    }
});