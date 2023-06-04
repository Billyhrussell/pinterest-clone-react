// show all of users collections
// TODO: pass all the PINS lmao

function CollectionList(){


  return(
    <section id="collectionList">
      {
        collections.map(c =>
          <CollectionCard title={c.title} description={c.description}/>)
      }
    </section>
  )
}