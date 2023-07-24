"use client"

// import { createContext, useContext, useState } from "react";

// const userContext = createContext("default");

// export const userContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState("default");

//   return (
//     <userContext.Provider value = {{currentUser, setCurrentUser}}>
//       { children }
//     </userContext.Provider>
//   )
// };

// export const useUserContext = () => useContext(userContext)


// 'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";



const GlobalContext = createContext({})

export const GlobalContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    return (
        <GlobalContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);