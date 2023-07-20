import React, { useContext, useEffect } from "react";
import userContext from "../components/userContext";
import "../css/Homepage.css"

/** Displays main homepage for Pinterest
 *
 * Props: none
 * State: none
 *
 * Routelist -> Homepage
 *
 */

function Homepage() {
  const { currentUser } = useContext(userContext);

  return (
    <div className="homepage">
      {currentUser &&
        <h2>Welcome Back, {currentUser.username}!</h2>}
      {!currentUser &&
        <div className="homepage-btn">
          <a href="/login" className="btn btn-primary me-3">Log In </a>
          <a href="/signup" className="btn btn-primary"> Sign Up</a>
        </div>}
    </div>
  );
}

export default Homepage;
