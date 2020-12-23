import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";

export const addError = (message) => {
  return {
    type: ADD_ERROR,
    message,
  };
};

export const removeError = () => {
  return {
    type: REMOVE_ERROR,
  };
};
