import { useUserContext } from "../Components/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import SelectFridge from "../Components/SelectFridge";
import AddItemModal from "../Components/AddItemModal";

const Household = () => {
  const [userFridges, setUserFridges] = useState();
  const { user } = useUserContext();
  const url = `/api/users/${user.id}`;
  const [currentFridge, setCurrentFridge] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(url, { withCredentials: true });
        setUserFridges(res.data.userFridges);
        //setCurrentFridge(userFridges[1]); ???
        //Mock data to test household button
        //setUserFridges([{id:1, name:"koti", products:[{id:1, name:"milk"}]}, {id:2, name:"vene", products:[{id:1, name:"milk"}]}, {id:3, name:"sauna", products:[{id:1, name:"juusto"}]}]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  // CREATE NEW FRIDGE

  // useEffect(()=> {
  //     async function postFridge(){
  //         try{
  //         const res = await axios.post('/api/fridges', {name: 'testi'}, {withCredentials: true})
  //         console.log(res)
  //         setReady(true)
  //         }
  //         catch(err){
  //             console.log(err)
  //         }
  //     }
  //     postFridge()
  // }, [])

  return (
    <>
      {userFridges && (
        <div>
          <h2>Household Page</h2>
          <SelectFridge
            currentFridge={currentFridge}
            setCurrentFridge={setCurrentFridge}
            fridges={userFridges}
          />
          <AddItemModal
            fridgeId={currentFridge?.id}
            setCurrentFridge={setCurrentFridge}
          />

          {currentFridge && (
            <div>
              Current fridge: {currentFridge.name}
              {currentFridge?.products.map((product) => (
                <li key={product.id}>
                  {product.name} {product.amount} {product.purchaseDate}{" "}
                  {product.expiryDate}
                </li>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Household;
