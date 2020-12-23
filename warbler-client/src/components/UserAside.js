import React from "react";
import defaultUserImg from "../images/user.png";

const UserAside = ({ user: { username, profileImageUrl } }) => (
  <aside className="user__aside">
    <img src={profileImageUrl || defaultUserImg} alt={username} />
  </aside>
);

export default UserAside;
