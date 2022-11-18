import { Navigate, Outlet } from "react-router-dom"
import LoadingPage from "../Pages/LoadingPage"
import { useUserContext } from "./UserContext"

const OpenRoutes = () => {
    const { user } = useUserContext()

    return (
        user.authenticated === null
        ? <LoadingPage />
        : user.authenticated === true 
            ? <Navigate to='/household' replace/>
            : 
            <>
                <Outlet />
            </>
    )

}

export default OpenRoutes