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
import dayjs from "dayjs";
import axios from "axios";

const urlInvite = "/api/invite";

const CreateInviteButton = ({ admin, fridgeId }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    alert('Text copied');
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
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create new fridge</DialogTitle>
        <DialogContent>
          <Form>
            <Input
              id="code"
              value={text}
              label="Invite code"
              variant="outlined"
              disabled={false}
              onChange={(e) => setText(e.target.value)}
            />
            <Actions>
              <Button onClick={() => setOpen(false)}>Close</Button>
              <Button onClick={() => copy()} disabled={!text}>Copy to clipboard</Button>
            </Actions>
          </Form>
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

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  maxWidth: "500px",
  width: "100%",
});

const Input = styled(TextField)({
  margin: "1rem 0 1rem 0",
});

const Actions = styled(DialogActions)({
  margin: " 1rem -1rem -1rem 0",
});
