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
import dayjs from "dayjs";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";

const urlInvite = "/api/invite";

const CreateInviteButton = ({ admin, fridgeId }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackOpen] = useState(false );

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setSnackOpen(true)
  };

  async function createInvite() {
    if(admin === true) {
      const code = Math.random().toString(36).slice(2,7);
      const now = dayjs()
      const expires = now.add(1, 'day');
      const invite = {
        code: code,
        expires: expires,
        fridgeId: fridgeId
      }
      console.log(JSON.stringify(invite))
      const res = await axios
        .post(urlInvite,
        invite,
        {
          withCredentials: true,
        })
        .then(openButton(code))
        .catch((e) => console.log(e));
    }
    else { console.log("Not admin") }
  }

  const openButton = (code) => {
    setText(code);
    setOpen(true);
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  }

  const handleclose = () => {
    setOpen(false)
    setSnackOpen(false)
  }

  return (
    <>
      <AddButton
        variant="outlined"
        size="small"
        endIcon={<AddIcon />}
        onClick={() => createInvite()}
        disabled={!admin}

      >
        Create new invite
      </AddButton>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Invite code copied to clipboard!
        </Alert>
      </Snackbar>
      <Dialog fullWidth open={open} onClose={handleclose}>
        <DialogTitle>Create new fridge</DialogTitle>
        <DialogContent>
          <form>
            <Input
              id="code"
              value={text}
              label="Invite code"
              variant="outlined"
              readOnly
              inputProps={{ readOnly: true }}
              fullWidth
              onChange={(e) => setText(e.target.value)}
              onClick={() => console.log('...')}
            />
            <Actions>
              <Button onClick={handleclose}>Close</Button>
              <Button onClick={() => copy()} disabled={!text}>Copy to clipboard</Button>
            </Actions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateInviteButton;

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
