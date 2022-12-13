import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";

const store = {
  user: null,
  isLoggedIn: null,
  projects: [],
};

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  return (
    <AppContext.Provider value={useReducer(reducer, store)}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
