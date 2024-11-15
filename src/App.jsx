import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import RegisterPage from "./pages/RegisterPage";
import ResultPage from "./pages/ResultPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import QuizSetPage from "./pages/admin/QuizsetPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/quizzes" element={<QuizPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/quizset" element={<QuizSetPage />} />
      </Routes>
    </>
  );
}

export default App;
