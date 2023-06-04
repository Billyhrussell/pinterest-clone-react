import { Routes, Route, Navigate } from 'react-router-dom';
import userContext from './userContext';
import React, { useContext } from "react";

import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetails from "./CompanyDetails";
import JobList from "./JobList";
import ProfileForm from './ProfileForm';
import SignUp from './SignUpForm';
import Login from './LoginForm';

/** Function  creates paths to different pages
 *
 * Props:
 * - login: function to be called in from parent
 * - signup: function to be called in from parent
 *
 * State: none
 *
 * App -> RoutesList -> { Homepage, CompanyList, CompanyDetails, JobList, LoginForm, SignUpForm,  }
 *
*/

function RouteList({ login, signup }) {
  const { currentUser } = useContext(userContext);

  return (
    <Routes>


      {currentUser &&
        <>
        {/* TODO: make sure this routes to user profile */}
          <Route
            path="/:username"
            element={<Profile />}
          />

          <Route
            path="/:username/:title"
            element={<Collection />}
          />

        </>}

        <Route
        path="/"
        element={<Page />}
      />

      {!currentUser &&
        <>
          <Route
            path="/login"
            element={<Login login={login} />}
          />

          <Route
            path="/signup"
            element={<SignUp register={signup} />}
          />
        </>
      }

      {/* FIXME: navigates to / when on companies twice */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default RouteList;

