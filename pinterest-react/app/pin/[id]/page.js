// Show a singular pin's details


// TODO: this is where we will call to backend and find data by ID
function PinDetails( { params } ){
  let { pin } = params;
  console.log("params ", params);
  return (
    <div className="PinDetails">
      <h3>{params.id}</h3>
      {/* <img src={pin.image}></img>
      <p>{pin.description}</p> */}
    </div>
  )
}

export default PinDetails;