import { useContext } from "react";
import { AuthContext } from "../contexts";

const useAuth = () => {
  const authContext = useContext(AuthContext);

  const setAuthWithStorage = (authData) => {
    authContext.setAuth(authData);
    localStorage.setItem("auth", JSON.stringify(authData));
  };

  const clearAuthWithStorage = () => {
    authContext.setAuth({});
    localStorage.removeItem("auth");
  };

  return {
    ...authContext,
    setAuth: setAuthWithStorage,
    clearAuth: clearAuthWithStorage,
  };
};

export default useAuth;
