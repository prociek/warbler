import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "./AuthForm";
import MessageForm from "./MessageForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth from "../hocs/withAuth";

const Main = (props) => {
  const { authUser, error, removeError, currentUser } = props;
  return (
    <main className="main">
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Homepage currentUser={currentUser} {...props} />}
        />
        <Route
          exact
          path="/signup"
          render={(props) => (
            <AuthForm
              removeError={removeError}
              error={error}
              onAuth={authUser}
              signup
              heading="Sign Up"
              buttonText="Sign Up"
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/signin"
          render={(props) => (
            <AuthForm
              removeError={removeError}
              error={error}
              onAuth={authUser}
              heading="Log In"
              buttonText="Log in"
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/users/:id/messages"
          component={withAuth(MessageForm)}
        />
      </Switch>
    </main>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  error: state.errors,
});

export default connect(mapStateToProps, { authUser, removeError })(Main);
