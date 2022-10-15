import BackButton from "../Components/BackButton";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <>
      <Link to="/settings" style={{textDecoration: 'none'}}>
        <BackButton />
      </Link>
      <h2>Terms and conditions</h2>
    </>
  );
};

export default Terms;
