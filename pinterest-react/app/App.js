import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter } from "react-router-dom";

import JoblyApi from "./_api.js";
import userContext from "./userContext";

import Navigation from "./Navigation";
import RoutesList from "./RoutesList";
import Loading from "./Loading";

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

const GLOBAL_TOKEN = "token";

function App() {

  const [token, setToken] = useState(localStorage.getItem(GLOBAL_TOKEN) || null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log("current user: ", currentUser);

  useEffect(function getCurrentUser() {

    async function getUser(token) {
      if (token) {
        JoblyApi.token = token;
        try {
          let user = jwt_decode(token);
          const userData = await JoblyApi.getUserInfo(user.username);
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

  async function login({ username, password }) {
    try {
      let tokenData = await JoblyApi.login(username, password);
      setToken(tokenData);
      localStorage.setItem(GLOBAL_TOKEN, tokenData);
    } catch (err) {
      console.error("ERROR: ", err);
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
    JoblyApi.token = null;
    localStorage.removeItem(GLOBAL_TOKEN);
  }

  async function signup({ username, password, firstName, lastName, email }) {
    try {
      let tokenData = await JoblyApi.createNewUser(username, password, firstName, lastName, email);
      setToken(tokenData);
      localStorage.setItem(GLOBAL_TOKEN, tokenData);
    } catch (err) {
      console.error("ERROR: ", err);
    }
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
