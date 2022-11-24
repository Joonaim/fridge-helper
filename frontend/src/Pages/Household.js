import { useUserContext } from "../Components/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import SelectFridge from "../Components/SelectFridge";
import AddItemModal from "../Components/AddItemModal";
import Warning from "../Components/Warning";
import dayjs from "dayjs";
import { Stack } from "@mui/system";
import styled from "styled-components";
import ItemTable from "../Components/ItemTable";
import breakpoint from "../Components/breakpoints";
import NoFridges from "../Components/NoFridges";

const Household = () => {
  const { user } = useUserContext();
  const [fridges, setFridges] = useState();
  const [fridgeId, setFridgeId] = useState(); //currently selected
  const [soonExpiring, setExpiring] = useState();
  const [expired, setExpired] = useState([]);
  const [formattedData, setFormat] = useState([]);

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

  useEffect(() => {
    // empty lists and find items always when selected firdge is changed
    setExpired([]);
    setExpiring([]);

    // Items that are expired
    selectedFridge?.products.map((item) => {
      item.expiryDate &&
        dayjs(item.expiryDate).isBefore(dayjs()) &&
        setExpired((arr) => [...arr, item]);
    });
    // Items that are expiring within 5 days
    selectedFridge?.products.map((item) => {
      item.expiryDate &&
        dayjs(item.expiryDate).isAfter(dayjs()) &&
        item.expiryDate &&
        dayjs(item.expiryDate).isBefore(dayjs().add(5, "day")) &&
        setExpiring((arr) => [...arr, item]);
    });
    setFormat(formData());
  }, [selectedFridge]);

  const createItem = async (newItem) => {
    try {
      const res = await axios.post(
        urlItems,
        { ...newItem, fridgeId },
        {
          withCredentials: true,
        }
      );
      setFridges((prev) =>
        prev.map((f) =>
          f.id !== fridgeId
            ? f
            : { ...f, products: f.products.concat(res.data) }
        )
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const manageItem = async (editedItem) => {
    try {
      const res = await axios.put(
        `${urlItems}/${editedItem.id}`,
        { ...editedItem, fridgeId },
        { withCredentials: true }
      );
      setFridges((prev) =>
        prev.map((f) =>
          f.id !== fridgeId
            ? f
            : {
                ...f,
                products: f.products.map((item) =>
                  item.id === res.data.id ? res.data : item
                ),
              }
        )
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const deleteItem = async (items, foodWaste) => {
    //console.log(`${urlItems}/${item.id}`);
    //console.log(items)

    try {
      if (foodWaste) {
        const foodWasteProducts = fridges
          .find((fridge) => fridge.id === fridgeId)
          .products.filter((product) => items.indexOf(product.id) !== -1);
        var fWProductsFormatted = [];
        foodWasteProducts.reduce((result, product) => {
          if (!result[product.name]) {
            result[product.name] = {
              name: product.name,
              amount: 0,
              fridgeId: fridgeId,
            };
            fWProductsFormatted.push(result[product.name]);
          }
          result[product.name].amount += 1;
          return result;
        }, {});

        await axios.post(
          "/api/foodwaste/products",
          { products: fWProductsFormatted, fridgeId: fridgeId },
          { withCredentials: true }
        );
      }

      await axios
        .delete(
          `${urlItems}`,
          { data: { fridgeId: fridgeId, itemIds: items } },
          { withCredentials: true }
        )
        .catch((err) => {
          console.log(err);
          return;
        })
        .then((response) => {
          if (response?.status == 204) {
            setFridges((prev) =>
              prev.map((f) =>
                f.id !== fridgeId
                  ? f
                  : {
                      ...f,
                      products: f.products.filter(
                        (product) => items.indexOf(product.id) === -1
                      ),
                    }
              )
            );
          }
        });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const formData = () => {
    let productList = [];
    let products = selectedFridge?.products;

    products?.map((item) => {
      let foundedItem = productList.find((i) => {
        return i.name.toUpperCase() === item.name.toUpperCase();
      });

      if (foundedItem) {
        if (
          !foundedItem.items.find((i) => i.id === item.id) &&
          dayjs(item.expiryDate).isBefore(dayjs(foundedItem.expiryDate))
        ) {
          foundedItem.expiryDate = item.expiryDate;
          foundedItem.purchaseDate = item.purchaseDate;
          foundedItem.items = foundedItem.items.concat(item);
        } else if (!foundedItem.items.find((i) => i.id === item.id)) {
          foundedItem.items = foundedItem.items.concat(item);
        }
      } else {
        let newItem = {
          name: item.name,
          expiryDate: item.expiryDate,
          purchaseDate: item.purchaseDate,
          items: [item],
        };
        productList = productList.concat(newItem);
      }
    });
    return productList;
  };

  return (
    <>
      {fridges?.length < 1 ? (
        <NoFridges/>
      ) : (
        fridges &&
        formattedData && (
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
              {expired.length > 0 && (
                <Warning
                  type="error"
                  message={`${expired.length} expired item(s)!`}
                />
              )}
              {soonExpiring.length > 0 && (
                <Warning
                  type="warning"
                  message={`${soonExpiring.length} item(s) exires within 5 days!`}
                />
              )}
            </Warnings>
            <ItemTable
              data={formattedData}
              manageItem={manageItem}
              deleteItem={deleteItem}
            />
          </div>
        )
      )}
    </>
  );
};

export default Household;

const Warnings = styled(Stack)`
  padding: 8px 16px;
  @media only screen and ${breakpoint.device.sm} {
    padding: 16px 32px;
  }
`;

const ButtonSection = styled.div`
  display: block;
  padding: 8px 16px 16px 16px;
  @media only screen and ${breakpoint.device.sm} {
    padding: 16px 32px;
  }
`;
