import { Link } from "react-router-dom";

import BackButton from "../Components/BackButton";

const FAQ = () => {
  return (
    <>
      <Link to="/settings">
        <BackButton />
      </Link>
      <h2>FAQ</h2>
    </>
  );
};

export default FAQ;
