"use client"
import React, { useState, useEffect, useContext } from "react";
import CollectionList from "../../components/userStuff/CollectionList"
import PinterestApi from "../api/route";
import userContext from '../../components/userContext'
import Loading from "../../components/Loading";
import { usePathname } from 'next/navigation'

// profile -> CollectionList -> CollectionCard -> [username][title][id] ->  pinList -> pinCard -> pin[id]

// if click on profile, show curr user
// if click on person's pfp, show persons profile

const { Button } = require("reactstrap");


function Profile(){

  const [saved, setSaved] = useState(true)
  const { currentUser } = useContext(userContext);
  const [profileData, setProfileData] = useState(currentUser)
  const [collectionData, setCollectionData] = useState(null)
  const [pinData, setPinData] = useState(null)


  console.log("PToken", PinterestApi.token)

  // FIXME: THIS SOMETIMES WORKS?
  const path = usePathname()
  // const username = path.slice(1)
  const username = "fretcow"

  useEffect(function getProfileOnMount(){
    console.log("inuseeffect")

    async function getUserProfile(username){

        try{
          const pData = await PinterestApi.getUserProfile(username)
          console.log("PROFILE DATAA ", pData)
          setProfileData(pData)
        } catch(err){
          console.error("Error fetching user info", err)
        }
      }

    async function getCollectionData(username){
      try{
        const c = await PinterestApi.getUserCollections(username)
        setCollectionData(c)
        console.log("COOLETIONSS" , c)
      }catch(err){
        console.error("Error getting collections:", err)
      }
    }

    // async function getPinData(username){
    //   try{
    //     const p = await PinterestApi.getUserPins(username)
    //     setPinData(p)
    //     console.log("PINZZ ", p)
    //   }catch(err){
    //     console.error("Error getting pins:", err)
    //   }
    // }
      getUserProfile(username);
      getCollectionData(username);
      // getPinData(username);

  }, []);


  if (!profileData) return <Loading/>
  if (!collectionData) return <Loading/>

  return(
  <section id="profile">
    <div>
      <h3>PROFILE PAGE OF {profileData.first_name}</h3>

      { profileData.username == currentUser.username ?
        <button className="btn btn-primary"> Edit Profile </button>
         :
        <button className="btn btn-primary"> Follow </button>
      }

      {/* TODO: HOW TO NAV B/T SAVED AND CREATED */}
      {/* this should be: collectionList and pinList  */}
      {
        // saved ?
        // <CollectionList collections={collectionData} setSaved={setSaved}/> :
        // <PinList pins={pinData} setSaved={setSaved}/>
        <div className="collectionList">
          <CollectionList collections={collectionData} setSaved={setSaved} username={username}/>
        </div>
      }


    </div>

  </section>
)
    }


export default Profile;
