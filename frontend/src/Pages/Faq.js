import { Link } from "react-router-dom";

import BackButton from "../Components/BackButton";
import CustomizedAccordions from "../Components/FaqAccordian";

const Faq = () => {
  return (
    <div style={{ padding: "0 12px" }}>
      <Link to="/settings" style={{ textDecoration: "none" }}>
        <BackButton />
      </Link>
      <h2>Frequently Asked Questions</h2>
      <CustomizedAccordions />
    </div>
  );
};

export default Faq;
