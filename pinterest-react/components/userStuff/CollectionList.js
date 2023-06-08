// show all of users collections
// TODO: pass all the PINS lmao
import CollectionCard from "./CollectionCard";


let INITIAL_COLLECTION = { "title" : "Ctest", "description" : "Ctest" }

function CollectionList( {collections }){
  console.log("INSIDE COLLECTION LIST")

  return(
    <section id="collectionList">
      <p>SHOWING A LIST</p>
      {
        collections.map(c =>
          <CollectionCard key={c.title} collection={c}/>)
      }
    </section>
  )
}

export default CollectionList;