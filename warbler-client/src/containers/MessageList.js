import React from "react";
import { connect } from "react-redux";
import { fetchMessages, deleteMessage } from "../store/actions/messages";

import MessageItem from "../components/MessageItem";

class MessageList extends React.Component {
  componentDidMount() {
    this.props.fetchMessages();
  }

  render() {
    const messages = this.props.messages.map((m) => (
      <MessageItem
        key={m._id}
        remove={() => this.props.deleteMessage(m._id)}
        canDelete={this.props.userId === m.user._id}
        {...m}
      />
    ));
    return <ul className="message__list">{messages}</ul>;
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    userId: state.currentUser.user.id,
  };
}

export default connect(mapStateToProps, { fetchMessages, deleteMessage })(
  MessageList
);
