import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";

const DeleteFridgeButton = ({ deleteFridge, name }) => {
  const [open, setOpen] = useState(false);

  const removeFridge = () => {
    setOpen(false);
    deleteFridge();
  };

  return (
    <>
      <AddButton
        variant="outlined"
        size="small"
        endIcon={<RemoveIcon/>}
        onClick={() => setOpen(true)}
      >
        Delete fridge
      </AddButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Are you sure you want to delete the fridge {name}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {name} and all of its contents will be deleted permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)}>Don&#39;t delete</Button>
            <Button onClick={() => removeFridge()} autoFocus>DELETE</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteFridgeButton;

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

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  maxWidth: "500px",
  width: "100%",
});

const Input = styled(TextField)({
  margin: "1rem 0 1rem 0",
});

const AmountButton = styled(IconButton)({
  margin: "0 0.5rem 0 0.5rem",
});

const Actions = styled(DialogActions)({
  margin: " 1rem -1rem -1rem 0",
});
