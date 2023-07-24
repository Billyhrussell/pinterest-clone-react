// Show a singular pin's details
"use client"

function PinDetails({pin}){

  return (
    <div className="PinDetails">
      <h3>{pin.title}</h3>
      <img src={pin.image}></img>
      <p>{pin.description}</p>
    </div>
  )
}

export default PinDetails;



