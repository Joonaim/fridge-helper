import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Components/UserContext";
import { Button } from "@mui/material";

export default function NavBar() {

    const {setUser} = useUserContext()
    const navigate = useNavigate()

    function logout() {

        fetch(process.env.REACT_APP_BACKEND_URL + "/auth/logout", {
                    method: 'DELETE',
                    credentials: 'include'
                }).catch(err => {
                    console.log(err)
                    return
                }).then(result => {
                    if (!result || !result.ok || result.status >= 400) {
                        console.log('Something went wrong logging out!')
                        return
                    }
                    return result.json()
                }).then(data => {
                    if (!data) {
                        return
                    }
                    if (data.authenticated !== null) {
                        setUser({ ...data })
                        navigate('/', { replace: true })
                    }
                })

    }

    return (
        <>
            <div>NavBar <Button variant="outlined" onClick={() => logout()}>Logout</Button></div>
        </>
        
    )
}