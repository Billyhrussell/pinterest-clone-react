// show all of users collections


import CollectionCard from "./CollectionCard";


// CollectionList -> CollectionCard -> [username][title][id] -> pinList -> pinCard -> pin[id]


function CollectionList( {username, collections }){

  return(
    <section id="collectionList">
      <p>List of Collections</p>
      {
        collections.map(c =>
          <CollectionCard key={c.title} collection={c} username={username}/>)
      }
    </section>
  )
}

export default CollectionList;