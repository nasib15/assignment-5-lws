import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import useAuth from "../hooks/useAuth";
import QuizProvider from "../providers/QuizProvider";
import ResultProvider from "../providers/ResultProvider";

const PrivateRoute = () => {
  const { auth } = useAuth();
  return (
    <>
      {auth?.accessToken ? (
        <body className="bg-[#F5F3FF]">
          <div className="container mx-auto py-3">
            <Navbar />
            <QuizProvider>
              <ResultProvider>
                <Outlet />
              </ResultProvider>
            </QuizProvider>
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
