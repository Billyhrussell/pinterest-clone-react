// Show a singular pin's details
"use client"
import PinterestApi from "@/app/api/route";
import React, { useState, useEffect, useContext } from "react";
import Loading from "../../../components/Loading"
import userContext from "@/app/Context/store";
import { useGlobalContext } from "@/app/Context/store";
  // NOTE: do we need to make an API call here?
  // We already have all the info needed.
// TODO: this is where we will call to backend and find data by ID

// CollectionList -> CollectionCard -> [username][title][id] -> pinList -> pinCard -> pin[id]


function PinDetails( { params } ){

  const {currentUser} = useGlobalContext();

  let { id } = params;
  const [pinInfo, setPin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function getPinOnMount() {
    async function getPin(id) {
        try {

          const pinData = await PinterestApi.getAPin(id);
          setPin(pinData);
          console.log("PINDATAAA ", pinData)
          setIsLoading(false);
        } catch (err) {
          console.error("ERROR: ", err);
        }
      }

    getPin(id);
  }, []);

  if(isLoading) return (<Loading />);

  return (
    <div className="PinDetails">
      <h3>{pinInfo.pin.title}</h3>
      <h3>{currentUser.username}</h3>


      {/* <img src={pinInfo.pin.image}></img> */}
      <p>{pinInfo.pin.description}</p>
    </div>
  )
}

export default PinDetails;