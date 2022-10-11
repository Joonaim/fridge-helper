import React from "react";
import { useUserContext } from "../Components/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";

const Household = () => {
  const [userFridges, setUserFridges] = useState();
  const { user } = useUserContext();
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/users/${user.id}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(url);
        setUserFridges(res.data.userFridges);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [url]);

  return (
    <div>
      <h2>Household Page</h2>
      <h3>Fridges</h3>
      {userFridges?.map((fridge) => (
        <ul key={fridge.id}>
          <h4>{fridge.name}</h4>
          {fridge?.products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default Household;
