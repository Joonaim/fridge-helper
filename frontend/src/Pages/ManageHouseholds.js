import { Link } from "react-router-dom";

import BackButton from "../Components/BackButton";
import Button from "@mui/material/Button";

import { useUserContext } from "../Components/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import SelectFridge from "../Components/SelectFridge";
import AddFridgeButton from "../Components/AddFridgeButton";
import DeleteFridgeButton from "../Components/DeleteFridgeButton";
import UseInviteButton from "../Components/UseInviteButton";
import UsersTable from "../Components/UsersTable";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import styled from "styled-components";

const ManageHouseholds = () => {
  const { user } = useUserContext();
  const [fridges, setFridges] = useState();
  const [users, setUsers] = useState();
  const [fridgeId, setFridgeId] = useState(); //currently selected

  const url = `/api/users/${user.id}`;
  const urlFridges = "/api/fridges";
  const urlInvite = "/api/invite";
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
  
  async function createInvite() {
    const admin = users.find(u => u.id === user.id).userFridge.admin
    if(admin === true) {
      const code = Math.random().toString(36).slice(2,7);
      const now = dayjs()
      const expires = now.add(1, 'day');
      const invite = {
        code: code,
        expires: expires,
        fridgeId: fridgeId
      }
      console.log(JSON.stringify(invite))
      const res = await axios
        .post(urlInvite,
        invite,
        {
          withCredentials: true,
        })
        .then(alert("Your invite code is " + code))
        .catch((e) => console.log(e));
    }
    else { console.log("Not admin") }
  }
  
  useEffect(() => {
    refreshFridges();
  }, []);

   useEffect(() => {
    //console.log(fridgeId);
    refreshUsers();
  }, [selectedFridge]);

  const useInvite = async (code) => {
    try {
      const res = await axios
        .get(urlInvite + '/' + code.name, { withCredentials: true })
        .then((res) => {
          refreshFridges();
        })
    } catch (err) {
      console.log(err);
    }
  }

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
            <UseInviteButton useInvite={useInvite} />
            <Button onClick={() => createInvite()}>(DEBUG) CREATE INVITE</Button>
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
