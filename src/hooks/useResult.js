import { useContext } from "react";
import { ResultContext } from "../contexts";

const useResult = () => {
  return useContext(ResultContext);
};

export default useResult;
