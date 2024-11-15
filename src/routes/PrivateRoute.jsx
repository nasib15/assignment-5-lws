import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
  const { auth } = useAuth();
  return (
    <>
      {auth?.token ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
export default PrivateRoute;
