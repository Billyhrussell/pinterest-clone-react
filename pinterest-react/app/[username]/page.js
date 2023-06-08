"use client"
import React, { useState, useEffect } from "react";
import CollectionList from "../../components/userStuff/CollectionList"
import PinList from "../../components/PinList"
// THIS FILE SHOWS THE USER PROFILE

// profile -> collections -> pins in collection -> pin
// if click on profile, show curr user
// if click on person's pfp, show persons profile

const { Button } = require("reactstrap");
let INITIAL_COLLECTION = [{ "username": "billy", "title" : "c_title_test", "description" : "C_descrip_test" }];
// ??? what is stored in currentUser again?

let currentUser = {}
// function Profile(user=currentUser){
function Profile(){
  const [saved, setSaved] = useState(true)
  let user = {"username": "billy"}

  console.log("hello")

  return(
  <section id="profile">
    <div>
      <h3>INSIDE PROFILE PAGE</h3>
      <img src={user.picture} class="img-fluid" alt="Responsive image"/>
      { user.username == currentUser.username ?
        <button>
          Edit Profile
        </button> :
        <button>
          Follow
        </button>
      }

      {/* TODO: HOW TO NAV B/T SAVED AND CREATED */}
      {/* this should be: collectionList and pinList  */}
      {
        saved ?
        <CollectionList collections={INITIAL_COLLECTION} setSaved={setSaved}/> :
        <PinList setSaved={setSaved}/>
      }


    </div>

  </section>
)

}

export default Profile;


// return(
//   <section id="profile">
//     <p>
//     hi

//     </p>



//   </section>
// )
