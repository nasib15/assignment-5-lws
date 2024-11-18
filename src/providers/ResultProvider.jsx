import { useReducer } from "react";
import { ResultContext } from "../contexts";
import { initialState, resultReducer } from "../reducers/ResultReducer";

const ResultProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resultReducer, initialState);

  return (
    <ResultContext.Provider value={{ state, dispatch }}>
      {children}
    </ResultContext.Provider>
  );
};

export default ResultProvider;
