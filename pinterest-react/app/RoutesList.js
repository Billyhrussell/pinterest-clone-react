"use client"
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useGlobalContext } from './Context/store';
import React, { useContext } from "react";

import { useRouter } from 'next/navigation';


import Homepage from "./index";

import Profile from './[username]/page'

import SignUp from './signup/page';
import Login from './login/page';
import Collection from '../components/userStuff/Collection'
import PinDetails from './pin/[id]/page';

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

function RoutesList({ login, signup }) {
  const navigate = useNavigate();
  const router = useRouter();
  const { currentUser } = useGlobalContext();

  return (

    <Routes>

      {currentUser &&
        <>
            <Route path="/" element={<Homepage/>}/>

            <Route path="/:username" element={<Profile/>}/>

            <Route path=":username/:title/:id" element={<Collection/>}/>

            <Route path="pin/:id" element={<PinDetails/>}/>

        </>
      }

      <Route
        path="/"
        element={<Homepage />}
      />

      {!currentUser &&
        <>
          <Route
            path="/login"
            element={<Login login={login} />}
          />
          <Route
            path="/signup"
            element={<SignUp signup={signup} />}
          />
        </>
      }

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

  );
}

export default RoutesList;



// FIXME: OLD WAY:
// return (
//   <Routes>


//     {currentUser &&
//       <>
//       {/* TODO: make sure this routes to user profile */}
//         <Route
//           path="/:username"
//           element={<Profile />}
//         />

//         <Route
//           path="/:username/:title"
//           element={<Collection />}
//         />

//       </>}

//       <Route
//       path="/"
//       element={<Home />}
//       />

//     {!currentUser &&
//       <>
//         <Route
//           path="/login"
//           element={<Login login={login} />}
//         />

//         <Route
//           path="/signup"
//           element={<SignUp register={signup} />}
//         />
//       </>
//     }

//     {/* FIXME: navigates to / when on companies twice */}
//     <Route path="*" element={<Navigate to="/" />} />

//   </Routes>