import React from "react";
import Moment from "react-moment";
import defaultUserImg from "../images/user.png";

const MessageItem = ({
  text,
  createdAt,
  user: { username, profileImageUrl },
  remove,
  canDelete,
}) => (
  <li className="message__item">
    <img src={profileImageUrl || defaultUserImg} alt={username} />
    <div>
      <span>@{username}</span>
      <Moment format={" HH:MM  DD-MM-YYYY"}>{createdAt}</Moment>
      <p>{text}</p>
    </div>
    {canDelete && (
      <button className="btn__danger" onClick={remove}>
        DELETE
      </button>
    )}
  </li>
);

export default MessageItem;
