import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import AdminLeftNavbar from "../components/dashboard/AdminLeftNavbar";
import useAuth from "../hooks/useAuth";
import AdminQuizProvider from "../providers/AdminQuizProvider";

const AdminRoute = () => {
  const { auth } = useAuth();
  const { user } = auth;

  const isAdmin = user?.role === "admin";

  if (!auth?.accessToken || !isAdmin) {
    // used set time out to show the toast after the page is loaded
    setTimeout(() => {
      toast.error("You are not authorized to access this page");
    }, 0);

    return <Navigate to="/login" />;
  }

  return (
    <AdminQuizProvider>
      <div className="min-h-screen flex">
        <AdminLeftNavbar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </AdminQuizProvider>
  );
};
export default AdminRoute;
