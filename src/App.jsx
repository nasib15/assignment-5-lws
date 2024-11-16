import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import RegisterPage from "./pages/RegisterPage";
import ResultPage from "./pages/ResultPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import QuizSetEntry from "./pages/admin/QuizSetEntry";
import QuizSetPage from "./pages/admin/QuizSetPage";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/result" element={<ResultPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/quizset" element={<QuizSetPage />} />
          <Route path="/admin/quizsetentry" element={<QuizSetEntry />} />
        </Route>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
