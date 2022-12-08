import { LOGIN_USER, LOGOUT_USER } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        user: action.payload,
        isLoggedIn: true,
      };
    case LOGOUT_USER:
      return {
        user: null,
        isLoggedIn: false,
      };
    default:
      throw new Error("use correct dispatch action");
  }
};

export default reducer;
