import {
  ADD_PROJECT,
  ADD_SKILL,
  DELETE_PROJECT,
  DELETE_SKILL,
  GET_PROJECTS,
  GET_SKILLS,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_PROJECT,
  UPDATE_SKILL,
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
    case GET_SKILLS:
      return {
        ...state,
        skills: action.payload,
      };
    case ADD_SKILL:
      return {
        ...state,
        skills: [...state.skills, action.payload],
      };
    case DELETE_SKILL:
      return {
        ...state,
        skills: state.skills.filter((item) => item.id !== action.payload.id),
      };
    case UPDATE_SKILL:
      return {
        ...state,
        skills: state.skills.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    default:
      throw new Error("use correct dispatch action");
  }
};

export default reducer;
