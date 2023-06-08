// shows a list of pins
import PinCard from "./PinCard";

let INITIAL_PINS = [{ "id": 1, "description" : "pin1test", "title" : "pin1test"},
{ "id": 2, "description" : "pin2test", "title" : "pin2test"},
{ "id": 3, "description" : "pin3test", "title" : "pin3test"},
{ "id": 4, "description" : "pin4test", "title" : "pin4test"} ]

function PinList({pins = INITIAL_PINS}){

  return (
    <section id="pinList">
      <p>hi</p>
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