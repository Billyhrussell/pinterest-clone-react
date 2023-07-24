"use client"

import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter } from "react-router-dom";
// import { useEffect } from 'react'
import { useGlobalContext } from './Context/store'
import { useRouter } from 'next/navigation';

import PinterestApi from "./api/route"

// import userContext from "@/app/Context/userContext";

import Navigation from "./Navigation";

import RoutesList from "./RoutesList"
import Loading from "../components/Loading";

import "../css/App.css"
/**
 * App
 *
 * props: none
 *
 * state:
 * - token
 * - currentUser: object {username, firstName, lastName, email, isAdmin, jobs}
 *      where jobs is {id, title, companyHandle, companyName, state}
 *
 * App -> { RoutesList, Navigation }
 *
 */

// TODO: commented b/c have not implemented user auth



function App() {
  const { currentUser, setCurrentUser } = useGlobalContext()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

  // NOTE: used http-only request instead, since we were having a problem with
  // storing the token in localStorage (also better against attacks)
  useEffect(function getCurrentUser() {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

    async function getUser(id) {
      if (id) {
        try {
          const userData = await PinterestApi.getUserInfo(id);
          console.log("user data on mount:", userData)
          setCurrentUser(userData);
          setIsLoading(false);
        } catch (err) {
          console.error("ERROR in getUser: ", err);
        }
      }else{
        console.log("in else in getUser")
        setCurrentUser(null);
        setIsLoading(false);
      }
    }

    const cookieID = getCookie('cookie-id')
    getUser(cookieID);
  }, []);

  if(isLoading) return (<Loading />);

  /** Handles login. */
  async function login({ username, password }) {
    try {
      let loginData = await PinterestApi.login(username, password);

      if(loginData.message == "Cookie Set Successfully"){
        setIsLoggedIn(true)
      }else{
        console.error("ERROR in login");
      }

    } catch (err) {
      console.error("ERROR in login: ", err);
    }
  }

  /** Handles Signup */
  async function signup({ username, password, firstName, lastName, email }) {
    try {
      let tokenData = await PinterestApi.createNewUser(username, password, firstName, lastName, email);
      setToken(tokenData);
      localStorage.setItem(GLOBAL_TOKEN, tokenData);
    } catch (err) {
      console.error("ERROR in signup: ", err);
    }
  }

  /** Handles site-wide logout */
  function logout() {
    setCurrentUser(null);
    setIsLoggedIn(false)
    // setToken(null);
    // PinterestApi.token = null;
    // localStorage.removeItem(GLOBAL_TOKEN);
  }

  /** Handles updating token outside of app.js */
  async function updateToken(tokenData){
    setToken(tokenData)
    localStorage.setItem(GLOBAL_TOKEN, tokenData)
  }

  return (

        <BrowserRouter>
          <div className="App" style={{backgroundColor:`bisque`}}>
            <Navigation logout={logout} />
            <div className="container">
              <RoutesList login={login} signup={signup} />
            </div>
          </div>
        </BrowserRouter>

  );
}

export default App;

// BEFORE:
// return (
  // <userContext.Provider value={{ currentUser, setCurrentUser }}>
  //   <div className="App">
  //     <BrowserRouter>
  //       {/* <Navigation logout={logout} /> */}
  //       <div className="container">
  //         {/* <RoutesList login={login} signup={signup} /> */}
  //       </div>
  //     </BrowserRouter>
  //   </div>

  // </userContext.Provider>
// );


{/* <div className="App">
<button type="button" onClick={() => router.push(`/${username}`)}>
Click me
</button>
</div> */}