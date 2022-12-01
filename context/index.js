import { useContext } from "react";
import { createContext } from "react";
import { LOGIN_USER } from "./actions";

const initialValues = {
  user: null,
  isLoggedIn: null,
};

const AppContext = createContext();

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
  const reducerValue = useReducer(reducer, initialValues);
  return (
    <AppContext.Provider value={reducerValue}>children</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
