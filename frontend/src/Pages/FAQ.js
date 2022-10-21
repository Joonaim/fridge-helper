import { Link } from "react-router-dom";

import BackButton from "../Components/BackButton";
import CustomizedAccordions from "../Components/FaqAccordian";

const Faq = () => {
  return (
    <>
      <Link to="/settings" style={{ textDecoration: "none" }}>
        <BackButton />
      </Link>
      <h2>Frequently Asked Questions</h2>
      <CustomizedAccordions />
    </>
  );
};

export default Faq;
