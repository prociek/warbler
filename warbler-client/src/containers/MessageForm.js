import React from "react";
import { addMessage } from "../store/actions/messages";
import { connect } from "react-redux";

class MessageForm extends React.Component {
  state = {
    message: "",
  };

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addMessage(this.state.message);
    this.setState({ message: "" });
    this.props.history.push("/");
  };

  render() {
    const { error } = this.props;
    return (
      <div className="message-form__container">
        {error.message && <div className="error">{error.message}</div>}
        <form onSubmit={this.handleSubmit}>
          <h3>Post a message</h3>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.message}
          />
          <button className="btn__primary" type="submit">
            Send
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { error: state.errors };
}

export default connect(mapStateToProps, { addMessage })(MessageForm);
