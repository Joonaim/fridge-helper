import { Link } from "react-router-dom";

import BackButton from "../Components/BackButton";

const ManageHouseholds = () => {
  return (
    <>
      <Link to="/settings" style={{textDecoration: 'none'}}>
        <BackButton />
      </Link>
      <h2>Manage households</h2>
    </>
  );
};

export default ManageHouseholds;