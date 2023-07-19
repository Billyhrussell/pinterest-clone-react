// show all of users collections
// TODO: pass all the PINS lmao
import CollectionCard from "./CollectionCard";


// CollectionList -> CollectionCard -> [username][title] ->
let INITIAL_COLLECTION = { "title" : "Ctest", "description" : "Ctest" }

function CollectionList( {username, collections }){
  console.log("INSIDE COLLECTION LIST", collections)


  return(
    <section id="collectionList">
      <p>SHOWING A LIST</p>
      {
        collections.map(c =>
          <CollectionCard key={c.title} collection={c} username={username}/>)
      }
    </section>
  )
}

export default CollectionList;