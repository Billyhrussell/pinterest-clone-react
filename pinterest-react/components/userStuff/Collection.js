// page for a single collection
// collection -> pinList -> pinCard -> pinDetails
// "use client"

function Collection(c){


  return(
    <section id="pinList">
      <h3>{c.title}</h3>
      <p>{pins.length()}</p>
      <p>{c.bio}</p>
      <PinList pins={pins}/>
    </section>
  )
}

export default Collection;