import { Link } from "react-router-dom";

import BackButton from "../Components/BackButton";

const General = () => {
  return (
    <>
      <Link to="/settings" style={{textDecoration: 'none'}}>
        <BackButton />
      </Link>
      <h2>General</h2>
    </>
  );
};

export default General;
