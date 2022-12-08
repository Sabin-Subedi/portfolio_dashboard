import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";

const store = {
  user: null,
  isLoggedIn: null,
};

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  return (
    <AppContext.Provider value={useReducer(reducer, store)}>
      {/* <AppContext.Consumer>
        {(value) => {
          console.log(value);
        }}
      </AppContext.Consumer> */}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
