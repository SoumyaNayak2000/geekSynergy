import { useContext } from "react";
import "../styles/profile.scss";

import { UserContext } from "../App";

const Profile = () => {
  const { user, logoutHandler } = useContext(UserContext);

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>User Profile</h1>
      </div>
      <div className="profile-info">
        <div className="info-item">
          <div>{user?.name}</div>
        </div>
        <div className="info-item">
          <div>{user?.email}</div>
        </div>
        <div className="info-item">
          <div>{user?.phone}</div>
        </div>
        <div className="info-item">
          <div>{user?.profession}</div>
        </div>
      </div>
      <button className="logout-btn" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
