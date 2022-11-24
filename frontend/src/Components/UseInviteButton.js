import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";

const UseInviteButton = ({ useInvite }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const doInvite = (event) => {
    event.preventDefault();
    useInvite({name});
  };

  return (
    <>
      <AddButton
        variant="outlined"
        size="small"
        endIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Join fridge
      </AddButton>
      
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Join a fridge</DialogTitle>
        <DialogContent>
          <form onSubmit={doInvite}>
            <Input
              id="code"
              label="Enter invite code"
              variant="outlined"
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
            <Actions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={name === ''} onClick={() => setOpen(false)}>
                Join fridge
              </Button>
            </Actions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UseInviteButton;

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

const Input = styled(TextField)({
  margin: "1rem 0 1rem 0",
});

const Actions = styled(DialogActions)({
  margin: " 1rem -1rem -1rem 0",
});
