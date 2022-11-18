import { useState, useEffect } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

const ImportBaselist = ({ currentSList, currentFridge, fridges, setFridges }) => {

  const [open, setOpen] = useState(false);
  const [baselists, setBaselists] = useState(fridges?.find((f) => f.id === currentFridge)?.baseLists)

  useEffect(() => {

    setBaselists(fridges?.find((f) => f.id === currentFridge)?.baseLists)
    
  }, [currentFridge, fridges]);

  const handleClick = async (list) => {
    console.log(JSON.stringify(list))

    if (currentSList) {

      const personal = currentSList === 2

      await axios.post('/api/shoppinglists/products/import', {baseListId: list.id, fridgeId: currentFridge, personal: personal}, { withCredentials: true })
            .catch((error) => {
                console.log('Error -> ' + error)
                if (error.response.data.error) {
                    console.log('Error body -> ' + error.response.data.error)
                }
                return
            }).then((result) => {
                if (!result || result.status >= 400) {
                    return
                } else if (result.data) {

                    const parsedData = result.data.map((product) => ({ id: product.id, name: product.name, amount: product.amount }))

                    const fridgesUpdated = fridges.map((fridge) => {
  
                        if (fridge.id !== currentFridge) {
                          return fridge
                        } else {

                          if (personal) {
                            return {...fridge, PersonalShoppingList: fridge.PersonalShoppingList.concat(parsedData)}
                          } else {
                            return {...fridge, SharedShoppingList: fridge.SharedShoppingList.concat(parsedData)}
                          }

                        }
    
                    })
    
                    setFridges(fridgesUpdated)
                    setOpen(false)
    
                }
            })

    }

  };

  return (
    <>
      <AddButton
        variant="outlined"
        size="small"
        endIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Import products from base shopping list
      </AddButton>
      <Dialog fullWidth maxWidth={'sm'} open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Import products from base shopping list</DialogTitle>
        <DialogContent>

        {baselists?.length > 0 ? 
        
          <List sx={{ pt: 0 }}>

              {baselists.map((list) => (

                <ListItem button onClick={() => handleClick(list)} key={list.id}>
                  <ListItemText primary={list.name} />
                </ListItem>

              ))}

          </List>

          :

          <>You have no baselists!</>
        }

        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImportBaselist;

const AddButton = styled(Button)({
  color: "#626E60",
  border: "1px solid #626E60",
  textDecoration: "none",
  fontFamily: "Open sans",
  fontSize: "18px",
  "&:hover": {
    color: "#384036",
    border: "1px solid #384036",
    background: "white",
  },
});
