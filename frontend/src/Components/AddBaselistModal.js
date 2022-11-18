import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/system";
import { Grid } from "@mui/material";

const AddBaselistModal = ({ createItem }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const addItem = (event) => {
    event.preventDefault();
    createItem({
      name
    });
    setName("")
    setOpen(false)
  };

  const closeModal = () => {
    setName("")
    setOpen(false)
  }

  return (
    <>
      <AddButton
        variant="outlined"
        size="small"
        onClick={() => setOpen(true)}
      >
        Create new base shopping list
      </AddButton>
      <Dialog fullWidth maxWidth={'sm'} open={open} onClose={closeModal}>
        <DialogTitle>Add new baselist</DialogTitle>
        <DialogContent>

          <form onSubmit={addItem}>

            <Grid container direction="column" spacing={1}>
              
              <Grid item>
                <Input
                  id="name"
                  label="List name"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

             </Grid>

              <Actions>
                <Button onClick={closeModal}>Cancel</Button>
                <Button disabled={name === ""} type="submit">
                  Add item
                </Button>
              </Actions>

            </form>

        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddBaselistModal;

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
