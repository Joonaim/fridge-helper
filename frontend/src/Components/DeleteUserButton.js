import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/system";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

const DeleteUserButton = ({ data, deleteUser }) => {
  const [open, setOpen] = useState(false);

  const removeUser = () => {
    setOpen(false);
    deleteUser(data.id);
  };

  return (
    <>
      <RemoveButton
        size="small"
        onClick={() => setOpen(true)}
      >
        <DoDisturbIcon align='center' fontSize='small' sx={{ color: "black"}}/>
      </RemoveButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Remove {data.username} ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {data.username} will be removed from the current fridge.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)}>Don&#39;t remove</Button>
            <Button onClick={() => removeUser()} autoFocus>REMOVE</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteUserButton;

const RemoveButton = styled(Button)({
    color: "#626E60",
    textDecoration: "none",
    margin: "0.5rem 0 1rem 0",
    "&:hover": {
      color: "#384036",
    
      background: "white",
    },
});
