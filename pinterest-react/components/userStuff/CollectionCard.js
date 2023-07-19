// a singular collection card
import Link from "next/link";
import { useRouter } from "next/router"
// TODO: ? get first picture inside of collection
// number of pins inside collection

// CollectionList -> CollectionCard -> [username][title][id] -> pinList -> pinCard -> pin[id]



function CollectionCard({ username, collection }){
  // let username = "fretcow"

  // const router = useRouter();


  console.log("INSIDE COLLECTION CARD")

  return(
    <div class="collectionCard">

      <Link href={`/${username}/${collection.title}/${collection.id}`}>

        {/* <img src="..." class="img-fluid" alt="Responsive image"></img> */}
        {collection.title}
        {/* <p>{pins.length()}</p> */}
      </Link>

    </div>
  )
}

export default CollectionCard;