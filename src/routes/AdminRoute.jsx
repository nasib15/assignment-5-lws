import { Navigate, Outlet } from "react-router-dom";
import AdminLeftNavbar from "../components/dashboard/AdminLeftNavbar";
import useAuth from "../hooks/useAuth";
import AdminQuizProvider from "../providers/AdminQuizProvider";

const AdminRoute = () => {
  const { auth } = useAuth();
  const { user } = auth;

  const isAdmin = user?.role === "admin";

  return (
    <>
      {auth?.accessToken && isAdmin ? (
        <AdminQuizProvider>
          <div className="bg-gray-100 min-h-screen flex">
            <AdminLeftNavbar />
            <Outlet />
          </div>
        </AdminQuizProvider>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
export default AdminRoute;
