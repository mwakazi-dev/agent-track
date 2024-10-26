import { useContext } from "react";

import { AuthContext } from "@/context/AuthContext";

// Custom hook to provide access to the AuthContext.
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
