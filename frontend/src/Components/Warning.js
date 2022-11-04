
import Alert from "@mui/material/Alert";
import styled from "styled-components";

const Warning = ({type, message}) =>{
    
  return(
    <AlertBar variant="outlined" severity={type}>
      {message}
    </AlertBar>
  );
};

export default Warning;


const AlertBar = styled(Alert)({
  margin: "8px 0 8px 0"
});