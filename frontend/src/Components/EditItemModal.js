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
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";

const EditItemModal = ({ item, manageItem }) => {

  const [name, setName] = useState(item.name);
  const [purchaseDate, setPurchaseDate] = useState(item.purchaseDate);
  const [expiryDate, setExpiryDate] = useState(item.expiryDate);
  const [numberOfProducts, setNumber] = useState(item.amount);
  const [open, setOpen] = useState(false);


  const editItem = async (event) => {
    event.preventDefault();
    manageItem({
      id: item.id,
      name,
      purchaseDate,
      expiryDate,
      amount: numberOfProducts,
    });
  };


  return (
    <div>{item &&<>
      <EditButton
        variant="outlined"
        size="small"
        onClick={() => setOpen(true)}
      >
        <EditIcon fontSize='small'/>
      </EditButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit item</DialogTitle>
        <DialogContent>
          <Form onSubmit={editItem}>
            <Input
              id="name"
              value={name}
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
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={() => setOpen(false)}>
                Save
              </Button>
            </Actions>
          </Form>
        </DialogContent>
      </Dialog></>}
    </div>
  );
};

export default EditItemModal;

const EditButton = styled(IconButton)({
  color: "#626E60",
  textDecoration: "none",
  margin: "0.5rem 0 1rem 0",
  "&:hover": {
    color: "#384036",
  
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
  color: "#626E60",
});
