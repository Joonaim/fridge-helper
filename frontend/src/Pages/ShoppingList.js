import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddItemSListModal from "../Components/AddItemSListModal";
import ImportBaselist from "../Components/ImportBaselist";
import ManageBaselists from "../Components/ManageBaselists";
import NoFridges from "../Components/NoFridges";
import SelectFridge from "../Components/SelectFridge";
import ShoppingListTable from "../Components/ShoppingListTable";
import { useUserContext } from "../Components/UserContext";

export default function ShoppingList() {
  const { user } = useUserContext();
  const url = `/api/users/${user.id}`;

  const [userFridges, setUserFridges] = useState();
  const [currentFridge, setCurrentFridge] = useState();
  const [currentSList, setCurrentSList] = useState();
  const [shoppingLists, setShoppingLists] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(url, { withCredentials: true });
        console.log(JSON.stringify(res.data.userFridges));
        setUserFridges(res.data.userFridges);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (currentFridge) {
      const curFridgeName = userFridges.find(
        (fridge) => fridge.id === currentFridge
      )?.name;

      setShoppingLists([
        { id: 1, name: "Shared shopping list for " + curFridgeName },
        { id: 2, name: "Personal shopping list for " + curFridgeName },
      ]);

      setCurrentSList(1);

      const lists = userFridges?.find(
        (f) => f.id === currentFridge
      )?.SharedShoppingList;
      if (lists?.length > 0) {
        setProducts(lists);
      } else {
        setProducts([]);
      }
    }
  }, [currentFridge]);

  useEffect(() => {
    const lists =
      currentSList == 1
        ? userFridges?.find((f) => f.id === currentFridge)?.SharedShoppingList
        : userFridges?.find((f) => f.id === currentFridge)
            ?.PersonalShoppingList;
    if (lists?.length > 0) {
      setProducts(lists);
    } else {
      setProducts([]);
    }
  }, [currentSList]);

  useEffect(() => {
    const lists =
      currentSList == 1
        ? userFridges?.find((f) => f.id === currentFridge)?.SharedShoppingList
        : userFridges?.find((f) => f.id === currentFridge)
            ?.PersonalShoppingList;
    if (lists?.length > 0) {
      setProducts(lists);
    } else {
      setProducts([]);
    }
  }, [userFridges]);

  const addItemToList = async (newItem) => {
    if (currentSList && currentFridge) {
      const personal = currentSList === 2;

      await axios
        .post(
          "/api/shoppinglists/products",
          { ...newItem, fridgeId: currentFridge, personal: personal },
          { withCredentials: true }
        )
        .catch((error) => {
          console.log("Error -> " + error);
          if (error.response.data.error) {
            console.log("Error body -> " + error.response.data.error);
          }
          return;
        })
        .then((result) => {
          if (!result || result.status >= 400) {
            return;
          } else if (result.data) {
            const fridgesUpdated = userFridges.map((fridge) => {
              if (fridge.id !== currentFridge) {
                return fridge;
              } else {
                if (personal) {
                  return {
                    ...fridge,
                    PersonalShoppingList: fridge.PersonalShoppingList.concat({
                      id: result.data.id,
                      name: result.data.name,
                      amount: result.data.amount,
                    }),
                  };
                } else {
                  return {
                    ...fridge,
                    SharedShoppingList: fridge.SharedShoppingList.concat({
                      id: result.data.id,
                      name: result.data.name,
                      amount: result.data.amount,
                    }),
                  };
                }
              }
            });

            setUserFridges(fridgesUpdated);
          }
        });
    }
  };

  const editItem = async (editedItem) => {
    if (currentSList && currentFridge) {
      const personal = currentSList === 2;

      await axios
        .put(
          "/api/shoppinglists/products",
          { ...editedItem, fridgeId: currentFridge, personal: personal },
          { withCredentials: true }
        )
        .catch((error) => {
          console.log("Error -> " + error);
          if (error.response.data.error) {
            console.log("Error body -> " + error.response.data.error);
          }
          return;
        })
        .then((result) => {
          if (!result || result.status >= 400) {
            return;
          } else if (result?.data?.edited) {
            const fridgesUpdated = userFridges.map((fridge) => {
              if (fridge.id !== currentFridge) {
                return fridge;
              } else {
                if (personal) {
                  const updatedShoppingList = fridge.PersonalShoppingList.map(
                    (product) => {
                      if (product.id !== editedItem.itemId) {
                        return product;
                      } else {
                        return {
                          ...product,
                          name: editedItem.name,
                          amount: editedItem.amount,
                        };
                      }
                    }
                  );

                  return {
                    ...fridge,
                    PersonalShoppingList: updatedShoppingList,
                  };
                } else {
                  const updatedShoppingList = fridge.SharedShoppingList.map(
                    (product) => {
                      if (product.id !== editedItem.itemId) {
                        return product;
                      } else {
                        return {
                          ...product,
                          name: editedItem.name,
                          amount: editedItem.amount,
                        };
                      }
                    }
                  );

                  return { ...fridge, SharedShoppingList: updatedShoppingList };
                }
              }
            });

            setUserFridges(fridgesUpdated);
          }
        });
    }
  };

  const deleteItem = async (deletedItems) => {
    const personal = currentSList === 2;

    await axios
      .delete(
        "/api/shoppinglists/products/",
        {
          data: {
            fridgeId: currentFridge,
            personal: personal,
            ...deletedItems,
          },
        },
        { withCredentials: true }
      )
      .catch((error) => {
        console.log("Error -> " + error);
        if (error.response.data.error) {
          console.log("Error body -> " + error.response.data.error);
        }
        return;
      })
      .then((result) => {
        if (!result || result.status >= 400) {
          return;
        } else if (result?.data?.deleted) {
          const fridgesUpdated = userFridges.map((fridge) => {
            if (fridge.id !== currentFridge) {
              return fridge;
            } else {
              if (personal) {
                const updatedShoppingList = fridge.PersonalShoppingList.filter(
                  (product) => deletedItems.itemIds.indexOf(product.id) === -1
                );
                return { ...fridge, PersonalShoppingList: updatedShoppingList };
              } else {
                const updatedShoppingList = fridge.SharedShoppingList.filter(
                  (product) => deletedItems.itemIds.indexOf(product.id) === -1
                );
                return { ...fridge, SharedShoppingList: updatedShoppingList };
              }
            }
          });

          setUserFridges(fridgesUpdated);
        }
      });
  };

  return (
    <>
      {userFridges?.length > 0 ? (
        <>
          <Grid
            container
            direction="column"
            spacing={0}
            style={{ padding: "0 12px" }}
          >
            <Grid item>
              <SelectFridge
                currentFridge={currentFridge}
                setCurrentFridge={setCurrentFridge}
                fridges={userFridges}
              />
            </Grid>

            {currentFridge && (
              <>
                <Grid item sx={{ marginBottom: 3 }}>
                  <ManageBaselists
                    currentFridge={currentFridge}
                    fridges={userFridges}
                    setFridges={setUserFridges}
                  />
                </Grid>

                {shoppingLists && (
                  <>
                    <Grid item>
                      <SelectFridge
                        currentFridge={currentSList}
                        setCurrentFridge={setCurrentSList}
                        fridges={shoppingLists}
                      />
                    </Grid>

                    <Grid item sx={{ marginBottom: 0.5 }}>
                      <ImportBaselist
                        currentFridge={currentFridge}
                        fridges={userFridges}
                        currentSList={currentSList}
                        setFridges={setUserFridges}
                      />
                    </Grid>

                    <Grid item>
                      <AddItemSListModal createItem={addItemToList} />
                    </Grid>

                    <Grid item>
                      <ShoppingListTable
                        data={products}
                        manageItem={editItem}
                        deleteSelected={deleteItem}
                      />
                    </Grid>
                  </>
                )}
              </>
            )}
          </Grid>
        </>
      ) : (<NoFridges/>)}
    </>
  );
}
