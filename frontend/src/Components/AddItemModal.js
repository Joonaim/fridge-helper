import { useState, useEffect } from "react";
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
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import RemoveIcon from "@mui/icons-material/Remove";
import {Actions, ActionButton} from "./MassActionModal";

const AddItemModal = ({ createItem }) => {
  const [name, setName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(dayjs());
  const [expiryDate, setExpiryDate] = useState(dayjs());
  const [numberOfProducts, setNumber] = useState(1);
  const [open, setOpen] = useState(false);

  const addItem = (event) => {
    event.preventDefault();
    for (let i = 0; i < numberOfProducts; i++) {
      createItem({
        name,
        purchaseDate,
        expiryDate,
      });
    }
  };

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
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add new item</DialogTitle>
        <DialogContent>
          <Form onSubmit={addItem}>
            <Input
              id="name"
              label="Item name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="Added"
                inputFormat="DD/MM/YYYY"
                value={purchaseDate}
                onChange={(value) => setPurchaseDate(value)}
                variant="standard"
                renderInput={(params) => <Input {...params} />}
              />
              <MobileDatePicker
                label="Expiration date"
                inputFormat="DD/MM/YYYY"
                value={expiryDate}
                onChange={(value) => setExpiryDate(value)}
                variant="standard"
                renderInput={(params) => <Input {...params} />}
              />
            </LocalizationProvider>
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

            <Actions>
              <ActionButton onClick={() => setOpen(false)}>Cancel</ActionButton>
              <ActionButton disabled={!name.length > 0} type="submit" onClick={() => setOpen(false)}>
                Add item
              </ActionButton>
            </Actions>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddItemModal;

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
  width: "100%",
});

const Input = styled(TextField)({
  margin: "1rem 0 1rem 0",
});

const AmountButton = styled(IconButton)({
  margin: "0 0.5rem 0 0.5rem",
});


