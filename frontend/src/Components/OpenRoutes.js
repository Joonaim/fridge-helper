import { Navigate, Outlet } from "react-router-dom"
import LoadingPage from "../Pages/LoadingPage"
import { useUserContext } from "./UserContext"

const OpenRoutes = () => {
    const { user } = useUserContext()

    return (
        user.authenticated === null
        ? <LoadingPage />
        : user.authenticated === true 
            ? <Navigate to='/fridges' replace/>
            : 
            <>
                {
                    //For debugging!
                    <h1>User Info: {JSON.stringify(user)}</h1>
                }
                <Outlet />
            </>
    )

}

export default OpenRoutes