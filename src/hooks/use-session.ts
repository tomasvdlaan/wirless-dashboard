import { useContext } from "react";
import AuthContext from "../context/auth-context";

function useSession() {
  return useContext(AuthContext);
}

export default useSession;
