import { useState } from "react";
import axios from "axios";
import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import AddButton from "./AddItemModal";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DeleteIcon from "@mui/icons-material/Delete";

const MassActionModal = ({selected, deleteItem, isfoodWaste}) => {
  const [open, setOpen] = useState(false);
  const handleDelete = (event) =>{
    event.preventDefault();
    deleteItem(selected)
  };

  console.log(selected);
  
  return(
    <div>
      <EditButton
        variant="outlined"
        size="small"
        onClick={() => setOpen(true)}
      >
        <EditIcon fontSize='medium'/>
      </EditButton>
      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit items</DialogTitle>
        <DialogContent>
          <p>You have selected {selected.length} items</p>
          <Buttons>
                  
            <StyledButton        
              variant="outlined"
              size="small"
              endIcon={<RestaurantIcon />} 
              onClick={e=>handleDelete(e, false)}>
              Mark items used
            </StyledButton>
            <StyledButton        
              variant="outlined"
              size="small"
              endIcon={<DeleteIcon />} 
              onClick={e=>handleDelete(e, true)}>
              Add items to waste
            </StyledButton>
                  
          </Buttons>
          <Actions>
            <ActionButton onClick={() => setOpen(false)}>Cancel</ActionButton>
            <ActionButton type="submit" onClick={() => setOpen(false)}>
                Save
            </ActionButton>
          </Actions>

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MassActionModal;

const EditButton = styled(IconButton)({
  color: "#626E60",
  textDecoration: "none",
  margin: "auto 1rem",
  "&:hover": {
    color: "#384036",
    
    background: "white",
  },
});
  
export const Actions = styled(DialogActions)({
  margin: " 1rem -1rem -1rem 0",
  color: "#626E60",
});

export const ActionButton = styled(Button)({
  color: "#626E60",
  textDecoration: "none",
  fontFamily: "Open sans",
  fontSize: "16px",
  "&:hover": {
    color: "#384036",
    background: "white",
  },
});

const Buttons = styled.div({
  display: "flex",
  flexDirection: "column"
});
 

const StyledButton = styled(Button)({
  color: "#626E60",
  border: "1px solid #626E60",
  textDecoration: "none",
  fontFamily: "Open sans",
  fontSize: "18px",
  marginBottom: "16px",
  "&:hover": {
    color: "#384036",
    border: "1px solid #384036",
    background: "white",
  },
});