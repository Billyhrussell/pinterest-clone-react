import JoblyApi from "./_api";
import userContext from "./userContext";
import { useState, useContext } from 'react';
import './ProfileForm.css';

/** Form for updating a user info.
 *
 * Props: none
 *
 * State:
 * - formData
 * - update: sets boolean to true when successfully updated
 *
 * RoutesList -> ProfileForm
 */

function ProfileForm() {
  let { currentUser, setCurrentUser } = useContext(userContext);
  let { username, firstName, lastName, email } = currentUser;
  let initial = { username, firstName, lastName, email };

  const [formData, setFormData] = useState(initial);

  const [updateSuccessful, setUpdateSuccessful] = useState(false);

  async function updateProfile(formData) {
    const { username, firstName, lastName, email } = formData;
    try {
      const updatedUser = await JoblyApi.updateUserInfo(username, firstName, lastName, email, profilePicture, about, website);
      setCurrentUser(updatedUser);
    } catch (err) {
      console.error("ERROR: ", err);
    }
  }

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    await updateProfile(formData);
    setUpdateSuccessful(true);
  }

  return (
    <div className="profilePage">
      <h3 className="mb-4">Profile</h3>
      <form className="ProfileForm" onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="mb-2 label">Username</label>
          <input
            id="username"
            name="username"
            className="form-control"
            placeholder={currentUser.username}
            onChange={handleChange}
            value={formData.username}
            aria-label="Username"
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="mb-2 label">First Name</label>
          <input
            id="firstName"
            name="firstName"
            className="form-control"
            placeholder={currentUser.firstName}
            onChange={handleChange}
            value={formData.firstName}
            aria-label="First Name"
          />
        </div>
        <div className="mb-3">
          <label className="mb-2 label">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            className="form-control"
            placeholder={currentUser.lastName}
            onChange={handleChange}
            value={formData.lastName}
            aria-label="Last Name"
          />
        </div>
        <div className="mb-3">
          <label className="mb-2 label">Email</label>
          <input
            id="email"
            name="email"
            className="form-control"
            placeholder={currentUser.email}
            onChange={handleChange}
            value={formData.email}
            aria-label="Email"
          />
        </div>
        {/* TODO: pic link  */}
        <div className="mb-3">
          <label className="mb-2 label">Picture</label>
          <input
            id="picture"
            name="picture"
            className="form-control"
            placeholder={currentUser.picture}
            onChange={handleChange}
            value={formData.picture}
            aria-label="Picture"
          />
        </div>
        <div className="mb-3">
          <label className="mb-2 label">About</label>
          <input
            id="about"
            name="about"
            className="form-control"
            placeholder={currentUser.about}
            onChange={handleChange}
            value={formData.about}
            aria-label="About"
          />
        </div>
        <div className="mb-3">
          <label className="mb-2 label">Website</label>
          <input
            id="website"
            name="website"
            className="form-control"
            placeholder={currentUser.website}
            onChange={handleChange}
            value={formData.website}
            aria-label="Website"
          />
        </div>

        {updateSuccessful &&
          <div className="alert alert-success" role="alert">
            Updated Successfully!
          </div>
        }
        <div>
          <button className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;