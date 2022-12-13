import {
  ADD_PROJECT,
  DELETE_PROJECT,
  GET_PROJECTS,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_PROJECT,
} from "./actions";

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
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    default:
      throw new Error("use correct dispatch action");
  }
};

export default reducer;
