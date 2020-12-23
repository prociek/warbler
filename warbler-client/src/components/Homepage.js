import React from "react";
import { Link } from "react-router-dom";
import MessageTimeline from "./MessageTimeline";

const Homepage = ({ currentUser }) => {
  if (!currentUser.isAuthenticated) {
    return (
      <div className="home">
        <h1>Welcome to Warbler</h1>
        <h4>New to Warbler?</h4>
        <Link to="/signup" className="btn__primary">
          Sign up
        </Link>
      </div>
    );
  }
  return <MessageTimeline {...currentUser} />;
};
export default Homepage;
