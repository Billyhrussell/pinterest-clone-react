"use client"
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import userContext from '../components/userContext';
import React, { useContext } from "react";

import { useRouter } from 'next/navigation';


// import Homepage from "./Homepage";
// import CompanyList from "./CompanyList";
// import CompanyDetails from "./CompanyDetails";
// import JobList from "./JobList";
// import ProfileForm from './ProfileForm';
import Profile from '../components/userStuff/Profile'
import SignUp from './signup/page';
import Login from './login/page';
import Collection from '../components/userStuff/Collection'
import Home from './page'
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
  // const { currentUser } = useContext(userContext);
  let currentUser = false;
  const navigate = useNavigate();
  const router = useRouter();



  return (
    <>


      {currentUser &&
        <>
        {/* TODO: change router.push to <Routes><Route> */}

        <Routes>
          <Route path="/:username"
          element={<Profile />}>
          </Route>
        </Routes>
        router.push({"/:username"});

        {/* router.query.username THIS IS FOR COLLECTION */}
        router.push({"/:username/:title"})


        </>}


      {!currentUser &&
        <>
        <Routes>
          <Route
            path="/login"
            element={<Login login={login} />}
          />
          <Route
            path="/signup"
            element={<SignUp signup={signup} />}
          />
          </Routes>
        </>
      }

      {/* FIXME: navigates to / when on companies twice */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}

      </>

  );
}

export default RouteList;



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