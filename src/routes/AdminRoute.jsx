import { Navigate, Outlet } from "react-router-dom";
import AdminLeftNavbar from "../components/dashboard/AdminLeftNavbar";
import useAuth from "../hooks/useAuth";

const AdminRoute = () => {
  const { auth } = useAuth();
  const { user } = auth;

  const isAdmin = user?.role === "admin";

  return (
    <>
      {auth?.accessToken && isAdmin ? (
        <div className="bg-gray-100 min-h-screen flex">
          <AdminLeftNavbar />
          <Outlet />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
export default AdminRoute;
