// page for a single collection
// collection -> pinList -> pinCard -> pinDetails
import PinList from "../../../components/PinList"
function Collection({ params }){

  console.log("INSIDE COLLECTION PAGE");

  return(
    <section id="pinList">
      <h1>COLLECTION PAGE</h1>
      <h3>{params.username}</h3>
      <h3>{params.title}</h3>

      {/* <p>{pins.length()}</p> */}
      {/* <p>{c.bio}</p> */}
      <PinList/>
    </section>
  )
}

export default Collection;