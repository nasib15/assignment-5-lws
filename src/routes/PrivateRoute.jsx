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

  const isAdmin = auth?.user?.role === "admin";

  if (!auth?.accessToken) {
    return <Navigate to="/login" />;
  }

  // differentiating admin and user provider because the admins need the adminquizprovider where as i don't want to provide the users also the adminquizprovider

  // admin specific

  if (isResultPage && isAdmin) {
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

  if (isAdmin) {
    return (
      <div className="bg-[#F5F3FF] min-h-screen flex flex-col">
        <div className="container mx-auto py-3 flex-1 flex flex-col">
          <Navbar />
          <AdminQuizProvider>
            <QuizProvider>
              <ResultProvider>
                <Outlet />
              </ResultProvider>
            </QuizProvider>
          </AdminQuizProvider>
          <Footer />
        </div>
      </div>
    );
  }

  // user specific

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
