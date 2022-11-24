import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const BackButton = () => {

  return (
    <StyledButton
      variant="contained"
      startIcon={<KeyboardBackspaceIcon/>}
      size="medium"
    >
      Settings
    </StyledButton>
  );
};

export default BackButton;

const StyledButton=styled(Button)({
  background: "#626E60",
  textDecoration: 'none',
  fontFamily: 'Open sans',
  fontSize: '18px',
  "&:hover":{
    background: "#384036"
  }
})
