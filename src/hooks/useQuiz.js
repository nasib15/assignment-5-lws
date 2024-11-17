import { useContext } from "react";
import { QuizContext } from "../contexts";

const useQuiz = () => {
  return useContext(QuizContext);
};
export default useQuiz;
