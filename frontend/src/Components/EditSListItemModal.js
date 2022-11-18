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
import EditIcon from "@mui/icons-material/Edit";
import { Grid } from "@mui/material";

const EditSlistItemModal = ({ item, manageItem }) => {

  const [name, setName] = useState(item.name);
  const [numberOfProducts, setNumber] = useState(item.amount);
  const [open, setOpen] = useState(false);


  const editItem = async (event) => {
    event.preventDefault();
    manageItem({
      itemId: item.id,
      name,
      amount: numberOfProducts,
    });
  };

  const closeModal = () => {
    setName(item.name)
    setNumber(item.amount)
    setOpen(false)
  }

  return (
    <>
      {item && 
        <>
          <EditButton
            variant="outlined"
            size="small"
            onClick={() => setOpen(true)}
          >
            <EditIcon fontSize='small'/>
          </EditButton>

          <Dialog fullWidth open={open} onClose={closeModal}>
            <DialogTitle>Edit item</DialogTitle>
            <DialogContent>
              <form onSubmit={editItem}>

              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Input
                    id="name"
                    value={name}
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
                  <Button type="submit" disabled={name === item.name && numberOfProducts == item.amount} onClick={() => setOpen(false)}>
                    Save
                  </Button>
                </Actions>
              </form>
            </DialogContent>
          </Dialog>
        </>
      }
    </>
  );
};

export default EditSlistItemModal;

const EditButton = styled(IconButton)({
  color: "#626E60",
  textDecoration: "none",
  margin: "0.5rem 0 1rem 0",
  "&:hover": {
    color: "#384036",
  
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
  color: "#626E60",
});
