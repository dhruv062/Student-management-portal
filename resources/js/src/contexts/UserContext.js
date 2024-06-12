
import { createContext, useContext, useState,useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Initialize user state
  useEffect(() => {
    const userRole = localStorage.getItem("role");
    const userId = localStorage.getItem("id");

    if (userRole && userId) {
      // Set the user object
      setUser({ role: userRole, id: userId });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
