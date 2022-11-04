import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "../Pages/LoadingPage";
import NavBar from "./NavBar";
import { useUserContext } from "./UserContext";

const ProtectedRoutes = () => {
  const { user } = useUserContext();

  return user.authenticated === null ? (
    <LoadingPage />
  ) : user.authenticated === true ? (
    <>
      <NavBar />
      {
        //For debugging...
        //<h1>User Info: {JSON.stringify(user)}</h1>
      }
      <Outlet />
    </>
  ) : (
    <Navigate to="/" replace />
  );
};
export default ProtectedRoutes;
