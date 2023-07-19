// page for a single collection
// collection -> pinList -> pinCard -> pinDetails
"use client"
// import PinList from "../../../components/PinList"
import React, { useState, useEffect, useContext } from "react";
import {useLocation} from "react-router-dom"
import Loading from "../../../../components/Loading";
import PinterestApi from "@/app/api/route";
import PinList from "@/components/PinList";

// CollectionList -> CollectionCard -> [username][title][id] -> pinList -> pinCard -> pin[id]

function Collection({  params}){

  console.log(params)
  let {title, username, id} = params
  const [pins, setPins] = useState(null);

  useEffect(function getPinsInCollectionOnMount(){
    async function getPins(id){
        try{
          const pData = await PinterestApi.getPinsInCollection(username, title, id)
          setPins(pData)
        } catch(err){
          console.error("Error fetching user info", err)
        }
      }
      getPins(id);
  }, []);

  if (!pins) return <Loading/>

  return(
    <section id="pinList">
      <h1>Collection page, showing pins in collection</h1>
      <h3>{username}</h3>
      <h3>{title}</h3>

      {/* <p>{pins.length()}</p> */}
      {/* <p>{c.bio}</p> */}
      <PinList pins={pins}/>
    </section>
  )
}

export default Collection;