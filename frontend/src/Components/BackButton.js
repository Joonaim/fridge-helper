import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import UTurnLeftIcon from "@mui/icons-material/UTurnLeft";

//this needs work

const BackButton = () => {
  const BackButton = styled(Button)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0px 16px",
    gap: "16px",
    width: "106px",
    height: "36px",
    left: "0px",
    top: "0px",
    background: "#626E60",
    borderRadius: "4px",

    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "36px",
    textAlign: "center",
    letterSpacing: "1.25px",
    textTransform: "uppercase",
    color: "#FFFFFF",
  });

  const iconStyle = {
    transform: "rotate(90deg)",
    border: "1.5px",
  };

  return (
    <BackButton
      variant="contained"
      startIcon={<UTurnLeftIcon style={iconStyle}></UTurnLeftIcon>}
      size="large"
    >
      BACK
    </BackButton>
  );
};

export default BackButton;
