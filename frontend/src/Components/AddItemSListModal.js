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
import RemoveIcon from "@mui/icons-material/Remove";
import { Grid } from "@mui/material";

const AddItemSListModal = ({ createItem }) => {
  const [name, setName] = useState("");
  const [numberOfProducts, setNumber] = useState(1);
  const [open, setOpen] = useState(false);

  const addItem = (event) => {
    event.preventDefault();
    createItem({
      name,
      amount: numberOfProducts,
    });
    setName("")
    setNumber(1)
    setOpen(false)
  };

  const closeModal = () => {
    setName("")
    setNumber(1)
    setOpen(false)
  }

  return (
    <>
      <AddButton
        variant="outlined"
        size="small"
        endIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Add item
      </AddButton>
      <Dialog fullWidth maxWidth={'sm'} open={open} onClose={closeModal}>
        <DialogTitle>Add new item</DialogTitle>
        <DialogContent>

          <form onSubmit={addItem}>

            <Grid container direction="column" spacing={1}>
              
              <Grid item>
                <Input
                  id="name"
                  label="Item name"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item>
                <div>
                  Amount:{" "}
                  <AmountButton
                    type="button"
                    disabled={numberOfProducts < 2}
                    onClick={() => setNumber(numberOfProducts - 1)}
                  >
                    <RemoveIcon />
                  </AmountButton>
                  {numberOfProducts}
                  <AmountButton
                    type="button"
                    onClick={() => setNumber(numberOfProducts + 1)}
                  >
                    <AddIcon />
                  </AmountButton>
                </div>
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

export default AddItemSListModal;

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

const AmountButton = styled(IconButton)({
  margin: "0 0.5rem 0 0.5rem",
});

const Actions = styled(DialogActions)({
  margin: " 1rem -1rem -1rem 0",
});
