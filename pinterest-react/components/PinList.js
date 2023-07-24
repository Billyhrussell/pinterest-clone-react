// shows a list of pins
"use client"

import PinCard from "./PinCard";
import "@/css/PinList.css"

let INITIAL_PINS = [{ "id": 1, "description" : "pin1test", "title" : "pin1test"},
{ "id": 2, "description" : "pin2test", "title" : "pin2test"},
{ "id": 3, "description" : "pin3test", "title" : "pin3test"},
{ "id": 4, "description" : "pin4test", "title" : "pin4test"} ]

// CollectionList -> CollectionCard -> [username][title][id] -> pinList -> pinCard -> pin[id]

function PinList({ pins }){
  console.log("pins", pins)
  return (
    <section className="pin_container">
      <div>
        {
          pins.map(pin =>
            <PinCard key={pin.title} pin={pin}/>)
        }
      </div>
    </section>
  )
}

export default PinList;