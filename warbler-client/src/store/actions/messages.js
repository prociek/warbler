import { LOAD_MESSAGES, REMOVE_MESSAGE } from "../actionTypes";
import { apiCall } from "../../services/api";
import { addError } from "../actions/errors";

export const loadMessages = (messages) => ({
  type: LOAD_MESSAGES,
  messages,
});

export const removeMessage = (id) => ({
  type: REMOVE_MESSAGE,
  id,
});

export const fetchMessages = () => {
  return (dispatch) => {
    return apiCall("get", "/api/messages")
      .then((res) => {
        dispatch(loadMessages(res));
      })
      .catch((err) => {
        dispatch(addError(err.message));
      });
  };
};

export const addMessage = (text) => (dispatch, getState) => {
  const userId = getState().currentUser.user.id;
  apiCall("post", `/api/users/${userId}/messages`, { text })
    .then((res) => {})
    .catch((err) => dispatch(addError(err.message)));
};

export const deleteMessage = (id) => (dispatch, getState) => {
  const userId = getState().currentUser.user.id;
  apiCall("delete", `/api/users/${userId}/messages/${id}`)
    .then(() => dispatch(removeMessage(id)))
    .catch((err) => dispatch(addError(err.message)));
};
