import { createContext, useContext, useState } from "react";
// import Cookies from 'universal-cookie';


const UserContext = createContext({});
// const cookie = new Cookies()
// const token = cookie.get('Bearer')

export default function UserContextProvider({ children }) {
  const [userContext, setUserContext] = useState({});

  return (
    <UserContext.Provider value={{ userContext, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
