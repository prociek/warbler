import React from "react";
import { connect } from "react-redux";

export default function withAuth(ComponentToRender) {
  class Authenticate extends React.Component {
    componentDidMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push("/signin");
      }
    }

    componentDidUpdate() {
      if (!this.props.isAuthenticated) {
        this.props.history.push("/signin");
      }
    }

    render() {
      return <ComponentToRender {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.currentUser.isAuthenticated,
    };
  }
  return connect(mapStateToProps)(Authenticate);
}
