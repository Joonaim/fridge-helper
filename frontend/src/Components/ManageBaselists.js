import { useState, useEffect } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddBaselistModal from "./AddBaselistModal";
import axios from "axios";
import SelectFridge from "./SelectFridge";
import AddItemSListModal from "./AddItemSListModal";
import ShoppingListTable from "./ShoppingListTable";

const ManageBaselists = ({ currentFridge, fridges, setFridges }) => {
  const [open, setOpen] = useState(false);
  const [currentBaselist, setCurrentBaselist] = useState();
  const [baselists, setBaselists] = useState();
  const [curBaselistProducts, setCurBaselistProducts] = useState();

  useEffect(() => {
      const lists = fridges?.find((f) => f.id === currentFridge)?.baseLists
      if (lists?.length > 0) {
        setCurrentBaselist(lists[0].id)
        setBaselists(lists)
        setCurBaselistProducts(lists[0].baseListProducts)
      } else {
        setCurrentBaselist()
        setBaselists()
        setCurBaselistProducts()
      }
  }, [currentFridge]);

  useEffect(() => {
    const lists = fridges?.find((f) => f.id === currentFridge)?.baseLists
    if (lists?.length > 0) {
      setBaselists(lists)
    } else {
      setCurrentBaselist()
      setBaselists()
      setCurBaselistProducts()
    }
  }, [fridges]);

  useEffect(() => {
    const listProducts = baselists?.find((l) => l.id === currentBaselist)?.baseListProducts
    if (listProducts?.length > 0) {
      setCurBaselistProducts(listProducts)
    } else {
      setCurBaselistProducts()
    }
  }, [currentBaselist, baselists]);

  const closeModal = () => {
    setOpen(false)
  }

  const addItemToList = async (newItem) => {

      if (currentBaselist && currentFridge) {

        await axios.post('/api/baselists/products', {...newItem, baseListId: currentBaselist, fridgeId: currentFridge}, { withCredentials: true })
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

                    const fridgesUpdated = fridges.map((fridge) => {
    
                        if (fridge.id !== currentFridge) {
                          return fridge
                        } else {

                          const updatedLists = fridge.baseLists.map((list) => {

                            if (list.id !== currentBaselist) {
                              return list
                            } else {
                              return {...list, baseListProducts: list.baseListProducts.concat({ id: result.data.id, name: result.data.name, amount: result.data.amount, createdAt: result.data.createdAt })}
                            }
                          })

                          return {...fridge, baseLists: updatedLists}
                        }
    
                    })
    
                    setFridges(fridgesUpdated)
    
                }
            })
            
      }

  };

  const createNewBaseList = async (newItem) => {

    if (currentFridge) {

        await axios.post('/api/baselists/' + currentFridge, {...newItem}, { withCredentials: true })
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

                    const fridgesUpdated = fridges.map((fridge) => {

                        if (fridge.id !== result.data.fridgeId)
                        return fridge
                        else 
                        return {...fridge, baseLists: fridge.baseLists.concat({id: result.data.id, name: result.data.name, baseListProducts: []})}

                    })

                    setCurrentBaselist(result.data.id)
                    setFridges(fridgesUpdated)

                }
            })

    }

  };

  const deleteBaseList = async () => {

    if (currentFridge && currentBaselist) {

      await axios.delete('/api/baselists/', {data: { fridgeId: currentFridge, baseListId: currentBaselist }}, { withCredentials: true })
          .catch((error) => {
              console.log('Error -> ' + error)
              if (error.response.data.error) {
                  console.log('Error body -> ' + error.response.data.error)
              }
              return
          }).then((result) => {
              if (!result || result.status >= 400) {
                  return
              } else if (result?.data?.deleted) {

                const updatedFridges = fridges.map((fridge) => {

                  if (fridge.id !== currentFridge) {
                    return fridge
                  } else {
                    const updatedBaselists = fridge.baseLists.filter(list => list.id !== currentBaselist)
                    return {...fridge, baseLists: updatedBaselists}
                  }

                })

                setFridges(updatedFridges)

                const newCurBaselist = updatedFridges?.find((f) => f.id === currentFridge)?.baseLists?.at(0)

                if (newCurBaselist) {
                  setCurrentBaselist(newCurBaselist.id)
                } else {
                  setCurrentBaselist()
                }

              }
          })

    }

  };

  const editBaseListProduct = async (editedItem) => {

      if (currentFridge && currentBaselist) {

        await axios.put('/api/baselists/products/', { fridgeId: currentFridge, baseListId: currentBaselist, ...editedItem }, { withCredentials: true })
            .catch((error) => {
                console.log('Error -> ' + error)
                if (error.response.data.error) {
                    console.log('Error body -> ' + error.response.data.error)
                }
                return
            }).then((result) => {
                if (!result || result.status >= 400) {
                    return
                } else if (result?.data?.edited) {

                  const updatedFridges = fridges.map((fridge) => {

                    if (fridge.id !== currentFridge) {
                      return fridge
                    } else {
                      const updatedBaselists = fridge.baseLists.map((baseList) => {

                        if (baseList.id !== currentBaselist) {
                          return baseList
                        } else {
                          const updatedProducts = baseList.baseListProducts.map((product) => {
                            if (product.id !== editedItem.itemId) {
                              return product
                            } else {
                              return {...product, name: editedItem.name, amount: editedItem.amount}
                            }
                          })
                          return ({...baseList, baseListProducts: updatedProducts})
                        }
                        
                      })

                      return {...fridge, baseLists: updatedBaselists}
                    }
  
                  })
  
                  setFridges(updatedFridges)
  
                }
            })

      }

  };

  const deleteBaseListProduct = async (editedItem) => {

      if (currentFridge && currentBaselist) {

        await axios.delete('/api/baselists/products/', {data: { fridgeId: currentFridge, baseListId: currentBaselist, ...editedItem }}, { withCredentials: true })
            .catch((error) => {
                console.log('Error -> ' + error)
                if (error.response.data.error) {
                    console.log('Error body -> ' + error.response.data.error)
                }
                return
            }).then((result) => {
                if (!result || result.status >= 400) {
                    return
                } else if (result?.data?.deleted) {
  
                  const updatedFridges = fridges.map((fridge) => {

                    if (fridge.id !== currentFridge) {
                      return fridge
                    } else {
                      const updatedBaselists = fridge.baseLists.map((baseList) => {

                        if (baseList.id !== currentBaselist) {
                          return baseList
                        } else {
                          const updatedProducts = baseList.baseListProducts.filter(listItem => editedItem.itemIds.indexOf(listItem.id) === -1)
                          return ({...baseList, baseListProducts: updatedProducts})
                        }
                        
                      })

                      return {...fridge, baseLists: updatedBaselists}
                    }
  
                  })
  
                  setFridges(updatedFridges)
  
                }
            })
            
      }

  };

  return (
    <>
      <OpenModalButton
        variant="outlined"
        size="small"
        onClick={() => setOpen(true)}
      >
        Manage base shopping lists
      </OpenModalButton>
      <Dialog fullScreen open={open} onClose={closeModal}>
        <DialogTitle>
          Manage base shopping lists
          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 14,
            }}
          >
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent dividers>

            <Grid container direction="column" spacing={1} sx={{ marginBottom: 1}}>
              
              {currentBaselist ? 
              <>
                <Grid item>
                  <SelectFridge
                    currentFridge={currentBaselist}
                    setCurrentFridge={setCurrentBaselist}
                    fridges={baselists}
                  />
                </Grid>
                <Grid item><AddBaselistModal createItem={createNewBaseList} /></Grid>
                <Grid item><OpenModalButton onClick={deleteBaseList}>Delete base list</OpenModalButton></Grid>
                <Grid item>
                  <AddItemSListModal createItem={addItemToList} />
                </Grid>

                {!curBaselistProducts &&
                  <Grid item>No products</Grid>
                }

              </> : 
              <>
                <Grid item>You have no base shopping lists!</Grid>
                <Grid item><AddBaselistModal createItem={createNewBaseList} /></Grid>
              </>
              }

            </Grid> 

            {currentBaselist && curBaselistProducts && 
              <ShoppingListTable data={curBaselistProducts} manageItem={editBaseListProduct} deleteSelected={deleteBaseListProduct} />
            }

        </DialogContent>
      </Dialog>
    </>
  );
}

export default ManageBaselists;

const OpenModalButton = styled(Button)({
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
