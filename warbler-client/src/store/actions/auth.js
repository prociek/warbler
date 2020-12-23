import { SET_CURRENT_USER } from "../actionTypes";
import { apiCall, setAuthHeader } from "../../services/api";
import { addError, removeError } from "./errors";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.clear();
    setAuthHeader(false);
    dispatch(setCurrentUser({}));
  };
}

export function authUser(pathType, userData) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${pathType}`, userData)
        .then((data) => {
          localStorage.setItem("jwtToken", data.token);
          dispatch(removeError());
          dispatch(setCurrentUser({ ...data }));
          setAuthHeader(data.token);
          resolve();
        })
        .catch((err) => {
          dispatch(addError(err.response.data.error.message));
        });
    });
  };
}
