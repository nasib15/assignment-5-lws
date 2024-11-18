import { useReducer } from "react";
import { AdminQuizContext } from "../contexts";
import { adminQuizReducer, initialState } from "../reducers/AdminQuizReducer";

const AdminQuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminQuizReducer, initialState);

  return (
    <AdminQuizContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminQuizContext.Provider>
  );
};

export default AdminQuizProvider;
