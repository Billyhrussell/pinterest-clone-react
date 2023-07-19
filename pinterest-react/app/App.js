"use client"

import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter } from "react-router-dom";

import { useRouter } from 'next/navigation';

import PinterestApi from "./api/route"
import userContext from "../components/userContext";

import Navigation from "../components/Navigation";
import RoutesList from "../app/RoutesList"
import Loading from "../components/Loading";

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

const GLOBAL_TOKEN = "token";

function App() {

  const [token, setToken] = useState(localStorage.getItem(GLOBAL_TOKEN) || null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function getCurrentUser() {

    async function getUser(token) {
      console.log("TOKEN" , token)
      if (token) {
        PinterestApi.token = token;
        try {
          let user = jwt_decode(token);
          console.log(user)
          const userData = await PinterestApi.getUserInfo(user.id);
          setCurrentUser(userData);
          setIsLoading(false);

        } catch (err) {
          console.error("ERROR: ", err);
        }
      }else{
        setCurrentUser(null);
        setIsLoading(false);
      }
    }
    getUser(token);
  }, [token]);

  if(isLoading) return (<Loading />);

  /** Handles login. */
  async function login({ username, password }) {
    try {
      let tokenData = await PinterestApi.login(username, password);
      setToken(tokenData);
      localStorage.setItem(GLOBAL_TOKEN, tokenData);
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
    setToken(null);
    PinterestApi.token = null;
    localStorage.removeItem(GLOBAL_TOKEN);
  }

  /** Handles updating token outside of app.js */
  async function updateToken(tokenData){
    setToken(tokenData)
    localStorage.setItem(GLOBAL_TOKEN, tokenData)

  }

  return (
    <userContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App">
        <BrowserRouter>
          <Navigation logout={logout} />
          <div className="container">
            <RoutesList login={login} signup={signup} />
          </div>
        </BrowserRouter>
      </div>

    </userContext.Provider>
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