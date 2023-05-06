import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

function useAuth() {
  const auth = useContext(AuthContext);

  return auth;
}

export default useAuth;
