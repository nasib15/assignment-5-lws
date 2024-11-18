import { useContext } from "react";
import { AdminQuizContext } from "../contexts";

const useAdminQuiz = () => {
  return useContext(AdminQuizContext);
};

export default useAdminQuiz;
