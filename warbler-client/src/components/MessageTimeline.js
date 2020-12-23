import React from "react";
import MessageList from "../containers/MessageList";
import UserAside from "./UserAside";

const MessageTimeline = (props) => (
  <React.Fragment>
    <UserAside {...props} />, <MessageList />
  </React.Fragment>
);

export default MessageTimeline;
