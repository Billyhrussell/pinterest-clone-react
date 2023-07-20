"use client"
import SavePinForm from "./SavePinForm"
import Link  from "next/link";
import PinDetails from "@/app/pin/[id]/page";
import React, { useState, useEffect } from "react";
import PinterestApi from "@/app/api/route";
import Loading from "./Loading";
// SHOWS GENERAL INFO for a pin

// TODO: how to store the collection_title when clicking save?
// user collections will be used everywhere, make global?

// CollectionList -> CollectionCard -> [username][title][id] -> pinList -> pinCard -> pin[id]

// Need pin creator here and in pin.details.

const DEFAULT_USER_IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"

function PinCard( { pin }){
  const [pinCreator, setPinCreator] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(pin)
  useEffect(function getNeededInfo() {

    async function savePin(collection){
      try{
        const pinData = await PinterestApi.storePin(collection, pin)
      }catch(err){
        console.error("Could not save pin", err)
      }
    }

    async function getUser(id){
      try{
        const userData = await PinterestApi.getUserInfo(id);
        console.log("UDATA", userData)
        setPinCreator(userData)
        setIsLoading(false)
      }
      catch(err){
        console.error("ERROR: ", err);
      }}

    getUser(pin.user_posted);

}, []);

if(isLoading) return (<Loading />);


  // in pin.title, cut off if > 50 chars
  return (
    <div className="card card_medium" onClick={() => <PinDetails pin={pin} creator={pinCreator}/>}>
      {/* <Link href={`/pin/${pin.id}`}> */}
        <img src={pin.picture}></img>
        <h5>{pin.title}</h5>

        <img className="user" src={DEFAULT_USER_IMG}></img>
        <p>{pinCreator.username}</p>

        {/* <SavePinForm onSubmit={savePin}/> */}
      {/* </Link> */}
    </div>
  )
}

export default PinCard;