import SavePinForm from "./SavePinForm"
import Link  from "next/link";
// SHOWS GENERAL INFO for a pin

// TODO: how to store the collection_title when clicking save?
// user collections will be used everywhere, make global?

function PinCard( { pin }){

  // FIXME: this is not in the right place. should be in HOMEPAGE?
  async function savePin(collection){
    // user stores pin to collection
    try{
      const pinData = await PinterestApi.storePin(collection, pin)
    }catch(err){
      console.error("Could not save pin", err)
    }
  }

  // is onClick doing what I intend rn?
  // when click on img -> go to pin page
  return (
    <div className="PinCard">
      <Link href={`/pin/${pin.id}`}>
        <h3>{pin.title}</h3>
        {/* <img src={pin.image} onClick={<PinDetails pin={pin}/>}></img> */}
        {/* <p>{pin.creator}</p> */}
        {/* <p>{pin.creatorImage}</p> */}

        {/* <SavePinForm onSubmit={savePin}/> */}
      </Link>
    </div>
  )
}

export default PinCard;