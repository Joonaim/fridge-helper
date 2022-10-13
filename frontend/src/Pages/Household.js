import React from "react";
import { useUserContext } from "../Components/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import SelectFridge from "../Components/SelectFridge";

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
                //Mock data to test household button
                setUserFridges([{id:1, name:"koti", products:[{id:1, name:"milk"}]}, {id:2, name:"vene", products:[{id:1, name:"milk"}]}, {id:3, name:"sauna", products:[{id:1, name:"juusto"}]}]);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [url]);

    return (      
        <>    
            {userFridges &&
            <div>
                <h2>Household Page</h2>
                <SelectFridge currentFridge={currentFridge} setCurrentFridge={setCurrentFridge} fridges={userFridges}/> 
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
            }
        </>  
    );
};

export default Household;