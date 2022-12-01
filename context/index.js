import { useContext, useReducer } from "react";
import { createContext } from "react";
import { LOGIN_USER } from "./actions";

const initialValues = {
  user: null,
  isLoggedIn: null,
};

export const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        user: action.payload,
        isLoggedIn: true,
      };
    default:
      throw new Error("use correct dispatch action");
  }
};

export const AppContextProvider = ({ children }) => {
  return (
    <AppContext.Provider value={useReducer(reducer, initialValues)}>
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
