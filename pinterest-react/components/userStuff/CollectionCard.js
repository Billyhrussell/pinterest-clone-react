// a singular collection card
import Link from "next/link";
import { useRouter } from "next/router"
// TODO: ? get first picture inside of collection
// number of pins inside collection

function CollectionCard({ collection }){
  let username = "billy"
  // let { title, description } = collection
  // const router = useRouter();


  console.log("INSIDE COLLECTION CARD")

  return(
    <div class="collectionCard">

      <Link href={`/${collection.username}/${collection.title}`}>

        {/* <img src="..." class="img-fluid" alt="Responsive image"></img> */}
        {collection.title}
        {/* <p>{pins.length()}</p> */}
      </Link>

    </div>
  )
}

export default CollectionCard;