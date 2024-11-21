import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import useAuth from "../hooks/useAuth";
import AdminQuizProvider from "../providers/AdminQuizProvider";
import QuizProvider from "../providers/QuizProvider";
import ResultProvider from "../providers/ResultProvider";

const PrivateRoute = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const isResultPage = location.pathname.includes("/result/");

  if (!auth?.accessToken) {
    return <Navigate to="/login" />;
  }

  // If user is admin, wrap with AdminQuizProvider
  if (auth?.user?.role === "admin") {
    return (
      <AdminQuizProvider>
        <QuizProvider>
          <ResultProvider>
            <Outlet />
          </ResultProvider>
        </QuizProvider>
      </AdminQuizProvider>
    );
  }

  if (isResultPage) {
    return (
      <QuizProvider>
        <ResultProvider>
          <Outlet />
        </ResultProvider>
      </QuizProvider>
    );
  }

  return (
    <div className="bg-[#F5F3FF] min-h-screen flex flex-col">
      <div className="container mx-auto py-3 flex-1 flex flex-col">
        <Navbar />
        <QuizProvider>
          <ResultProvider>
            <Outlet />
          </ResultProvider>
        </QuizProvider>
        <Footer />
      </div>
    </div>
  );
};

export default PrivateRoute;
