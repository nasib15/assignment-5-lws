import { createContext } from "react";

const AuthContext = createContext(null);
const QuizContext = createContext(null);
const AdminQuizContext = createContext(null);
const ResultContext = createContext(null);

export { AdminQuizContext, AuthContext, QuizContext, ResultContext };
