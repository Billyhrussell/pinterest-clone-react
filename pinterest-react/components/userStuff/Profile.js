// profile -> collections -> pins in collection -> pin
// if click on profile, show curr user
// if click on person's pfp, show persons profile

const { Button } = require("reactstrap");

// ??? what is stored in currentUser again?
function Profile(user=currentUser){
  const [saved, setSaved] = useState(true)


  return(
    <section id="profile">
      <div>
        <img src={user.picture} class="img-fluid" alt="Responsive image"/>
        { user.username == currentUser.username ?
          <button>
            Edit Profile
          </button> :
          <button>
            Follow
          </button>
        }

        {/* TODO: HOW TO NAV B/T SAVED AND CREATED */}
        {
          saved ?
          <SavedPins setSaved={setSaved}/> :
          <CreatedPins setSaved={setSaved}/>
        }


      </div>

    </section>
  )


}