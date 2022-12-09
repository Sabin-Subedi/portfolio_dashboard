import { GET_PROJECTS, LOGIN_USER, LOGOUT_USER } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    default:
      throw new Error("use correct dispatch action");
  }
};

export default reducer;
