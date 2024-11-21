import { useContext } from "react";
import { AuthContext } from "../contexts";

const useAuth = () => {
  const authContext = useContext(AuthContext);

  const setAuthWithStorage = (authData) => {
    authContext.setAuth(authData);
  };

  return {
    ...authContext,
    setAuth: setAuthWithStorage,
  };
};

export default useAuth;
