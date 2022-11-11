import { Link } from "react-router-dom";

import BackButton from "../Components/BackButton";
import Button from "@mui/material/Button";

import { useUserContext } from "../Components/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import SelectFridge from "../Components/SelectFridge";
import AddFridgeButton from "../Components/AddFridgeButton";
import DeleteFridgeButton from "../Components/DeleteFridgeButton";
import UsersTable from "../Components/UsersTable";
import { Stack } from "@mui/system";
import styled from "styled-components";

const ManageHouseholds = () => {
  const { user } = useUserContext();
  const [fridges, setFridges] = useState();
  const [users, setUsers] = useState();
  const [fridgeId, setFridgeId] = useState(); //currently selected

  const url = `/api/users/${user.id}`;
  const urlFridges = "/api/fridges";
  const urlUserFridges = "/api/userfridges";
  const selectedFridge = fridges?.find((f) => f.id == fridgeId);

  async function refreshFridges() {
    try {
      const res = await axios
        .get(url, { withCredentials: true })
        .then((res) => {
          setFridges(res.data.userFridges);
          refreshUsers();
        })
      
    } catch (err) {
      console.log(err);
    }
  }

  async function refreshUsers() {
    try {
      if(fridgeId) {
        const res = await axios.get(urlFridges + '/' + fridgeId, { withCredentials: true });
        setUsers(res.data.fridgeUsers);
      }
      else {
        setUsers([])
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    refreshFridges();
  }, []);

   useEffect(() => {
    console.log(fridgeId);
    refreshUsers();
  }, [selectedFridge]);

  const createFridge = async (newFridge) => {
    const res = await axios
        .post(urlFridges,
        { 
          ...newFridge 
        },
        {
          withCredentials: true,
        })
        .then((res) => {
          refreshFridges();
        })
        .catch((e) => console.log(e));
  };

  const deleteFridge = async() => {
    const res = await axios
      .delete(urlFridges + '/' + fridgeId,
        {
          withCredentials: true,
        })
        .then((res) => {
          refreshFridges();
          setFridgeId(fridges.find(x=>x!==undefined).id);
        })
        .catch((e) => console.log(e));
  };

  return (
    <>
      <Link to="/settings" style={{textDecoration: 'none'}}>
        <BackButton />
      </Link>
      <h2>Manage households</h2>
      {fridges && (
        <div>
          <ButtonSection>
            <SelectFridge
              currentFridge={fridgeId}
              setCurrentFridge={setFridgeId}
              fridges={fridges}
            />
            <AddFridgeButton createFridge={createFridge} />
            <DeleteFridgeButton deleteFridge={deleteFridge} name={selectedFridge?.name} />
            <Button onClick={() => refreshUsers()}>(DEBUG) REFRESH USER LIST</Button>
          </ButtonSection>
          
          <UsersTable
            userData={users}
            
          /> 
          { /* ^^^ manageItem={manageItem}*/ }
        </div>
      )}
    </>
  );
};

export default ManageHouseholds;

const Warnings = styled(Stack)`
  padding-bottom: 16px;
`;

const ButtonSection = styled.div`
  display: block;
  padding: 8px 0 16px 0;
`;
