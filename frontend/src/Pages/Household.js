import { useUserContext } from "../Components/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import SelectFridge from "../Components/SelectFridge";
import AddItemModal from "../Components/AddItemModal";

const Household = () => {
  const { user } = useUserContext();
  const [fridges, setFridges] = useState();
  const [fridgeId, setFridgeId] = useState(); //currently selected

  const url = `/api/users/${user.id}`;
  const urlItems = "/api/products";
  const selectedFridge = fridges?.find((f) => f.id == fridgeId);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(url, { withCredentials: true });
        setFridges(res.data.userFridges);
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

  const createItem = async (newItem) => {
    try {
      const res = await axios.post(
        urlItems,
        { ...newItem, fridgeId },
        {
          withCredentials: true,
        }
      );
      setFridges(
        fridges.map((f) =>
          f.id !== fridgeId
            ? f
            : { ...f, products: f.products.concat(res.data) }
        )
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      {fridges && (
        <div>
          <h2>Household Page</h2>
          <SelectFridge
            currentFridge={fridgeId}
            setCurrentFridge={setFridgeId}
            fridges={fridges}
          />
          <AddItemModal createItem={createItem} />

          {selectedFridge && (
            <div>
              Current fridge: {selectedFridge.name}
              {selectedFridge?.products.map((product) => (
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
