import { useEffect, useState } from "react";
import { AuthContext } from "../contexts";

const AuthProvider = ({ children }) => {
  const localStorageAuth = localStorage.getItem("auth");

  const [auth, setAuth] = useState(
    localStorageAuth ? JSON.parse(localStorageAuth) : {}
  );

  // Update localstorage whenever auth changes
  useEffect(() => {
    // check if auth is empty object
    if (Object.keys(auth).length) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
