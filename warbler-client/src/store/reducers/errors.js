import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";

const errors = (state = { message: null }, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return { message: action.message };
    case REMOVE_ERROR:
      return { message: null };
    default:
      return state;
  }
};

export default errors;
