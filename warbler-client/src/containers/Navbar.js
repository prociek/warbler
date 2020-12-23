import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import Logo from "../images/bacc5724-e64b-4b8a-918b-1a8185a5498b_200x200.png";

class Navbar extends Component {
  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <nav className="navbar">
        <header className="logo__container">
          <Link to="/" className="navbar__link">
            <img className="logo__img" src={Logo} alt="Warbler Logo" />
          </Link>
        </header>
        {this.props.currentUser.isAuthenticated ? (
          <ul className="navbar__list">
            <li className="navbar__item">
              <Link
                to={`/users/${this.props.currentUser.user.id}/messages`}
                className="navbar__link"
              >
                New Message
              </Link>
            </li>
            <li className="navbar__item">
              <button onClick={this.logout} className="navbar__link">
                Log out
              </button>
            </li>
          </ul>
        ) : (
          <ul className="navbar__list">
            <li className="navbar__item">
              <Link to="/signup" className="navbar__link">
                Sign up
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/signin" className="navbar__link">
                Log in
              </Link>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, { logout })(Navbar);
