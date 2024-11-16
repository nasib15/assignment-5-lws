import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
  const { auth } = useAuth();
  return (
    <>
      {auth?.authToken ? (
        <body className="bg-[#F5F3FF]">
          <div className="container mx-auto py-3">
            <Navbar />
            <Outlet />
            <Footer />
          </div>
        </body>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
export default PrivateRoute;
