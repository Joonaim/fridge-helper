import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";

const AddFridgeButton = ({ createFridge }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const addFridge = (event) => {
    event.preventDefault();
    createFridge({
        name
    });
  };

  return (
    <>
      <AddButton
        variant="outlined"
        size="small"
        endIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Create new fridge
      </AddButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create new fridge</DialogTitle>
        <DialogContent>
          <Form onSubmit={addFridge}>
            <Input
              id="name"
              label="Fridge name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <Actions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={() => setOpen(false)}>
                Create fridge
              </Button>
            </Actions>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddFridgeButton;

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
