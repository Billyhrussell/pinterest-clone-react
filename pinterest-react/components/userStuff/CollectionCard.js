// a singular collection card
// TODO: ? get first picture inside of collection
// number of pins inside collection
function CollectionCard({title, description}){

  return(
    <div class="collectionCard">
      <Link href={`/${username}/${title}`}>

        <img src="..." class="img-fluid" alt="Responsive image"></img>
        <h3>{title}</h3>
        <p>{pins.length()}</p>
      </Link>

    </div>
  )
}

export default CollectionCard;