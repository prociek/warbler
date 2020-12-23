import React from "react";

class AuthForm extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    profileImageUrl: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const path = this.props.signup ? "signup" : "signin";
    this.props
      .onAuth(path, this.state)
      .then(() => {
        this.setState({
          username: "",
          email: "",
          password: "",
          passwordConfirm: "",
          profileImageUrl: "",
        });
        this.props.history.push("/");
      })
      .catch(() => {
        return;
      });
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirm,
      profileImageUrl,
    } = this.state;

    const {
      heading,
      buttonText,
      signup,
      error,
      removeError,
      history,
    } = this.props;

    history.listen(removeError);

    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <h2>{heading}</h2>
          {error.message && <div className="error">{error.message}</div>}
          {signup && (
            <React.Fragment>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={this.handleChange}
              />
            </React.Fragment>
          )}
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />
          <label htmlFor="passwordConfirm">Confirm Password:</label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={this.handleChange}
          />
          {signup && (
            <React.Fragment>
              <label htmlFor="profileImageUrl">Profile Image Url:</label>
              <input
                id="profileImageUrl"
                name="profileImageUrl"
                type="text"
                value={profileImageUrl}
                onChange={this.handleChange}
              />
            </React.Fragment>
          )}
          <button type="submit" className="btn__primary">
            {buttonText}
          </button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
