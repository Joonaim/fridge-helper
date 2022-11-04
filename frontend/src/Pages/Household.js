import { useUserContext } from "../Components/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import SelectFridge from "../Components/SelectFridge";
import AddItemModal from "../Components/AddItemModal";
import EditItemModal from "../Components/EditItemModal";
import ProductsTable from "../Components/ProductsTable";
import Warning from "../Components/Warning";
import dayjs from "dayjs";
import { Stack} from "@mui/system";
import styled from "styled-components";

const Household = () => {
  const { user } = useUserContext();
  const [fridges, setFridges] = useState();
  const [fridgeId, setFridgeId] = useState(); //currently selected
  const [soonExpiring, setExpiring] = useState();
  const [expired, setExpired] = useState([]);

  const url = `/api/users/${user.id}`;
  const urlItems = "/api/products";
  const selectedFridge = fridges?.find((f) => f.id == fridgeId);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(url, { withCredentials: true });
        setFridges(res.data.userFridges);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(()=>{
    // empty lists and find items always when selected firdge is changed
    setExpired([]);
    setExpiring([]);

    // Items that are expired
    selectedFridge?.products.map((item)=> {
      item.expiryDate && dayjs(item.expiryDate).isBefore(dayjs()) && setExpired(arr =>[...arr, item]);
    }
    );
    // Items that are expiring within 5 days
    selectedFridge?.products.map((item)=> {
      item.expiryDate && dayjs(item.expiryDate).isAfter(dayjs()) && item.expiryDate && dayjs(item.expiryDate).isBefore(dayjs().add(5, "day"))&& setExpiring(arr =>[...arr, item]);
    }
    );
  }, [selectedFridge]);

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

  const manageItem = async (editedItem) =>{
    try {
      const res = await axios.put(
        `${urlItems}/${editedItem.id}`, {...editedItem, fridgeId}, {withCredentials: true});     
      setFridges(
        fridges.map((f) =>
          f.id !== fridgeId
            ? f
            : { ...f, products: f.products.map((item)=> item.id === res.data.id ? res.data : item) }
        )
      );
    }
    catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      {fridges && (
        <div>
          <ButtonSection>
            <SelectFridge
              currentFridge={fridgeId}
              setCurrentFridge={setFridgeId}
              fridges={fridges}
            />
            <AddItemModal createItem={createItem} />
          </ButtonSection>
          <Warnings>
            {expired.length > 0 && <Warning type = 'error' message={`${expired.length} expired item(s)!`}/>}
            {soonExpiring.length > 0 && <Warning type='warning' message={`${soonExpiring.length} item(s) exires within 5 days!`}/>}
          </Warnings>
          <ProductsTable data = {selectedFridge?.products} manageItem={manageItem}/>
          
        </div>
      )}
    </>
  );
};

export default Household;


const Warnings = styled(Stack)`
padding-bottom: 16px
`;



const ButtonSection = styled.div`
  display: block;
  padding: 8px 0 16px 0;
`;