import { Button } from "@mui/material";
import { styled } from "@mui/system";

const PrimaryButtonStyled = styled(Button)({
  color: "#626E60",
  border: "1px solid #626E60",
  textDecoration: "none",
  fontFamily: "Open sans",
  fontSize: "16px",
  "&:hover": {
    color: "#384036",
    border: "1px solid #384036",
    background: "white",
  },
});

export default PrimaryButtonStyled;
