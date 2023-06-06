"use client"
import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation"

// import "./SignUpForm.css"
import userContext from "../../components/userContext";


/** Form for adding.
 *
 * Props:
 * - register: function to call in parent.
 *
 * State:
 * - formData
 *
 * RoutesList -> SignUpForm
 */

// FIXME: change curr user once have avail
function SignUpForm({ register }) {
  // const { currentUser } = useContext(userContext);
  let currentUser = false
  const initial =
    { username: "", password: "", firstName: "", lastName: "", email: "" };
  // const navigate = useNavigate();
  const router = useRouter();

  const [formData, setFormData] = useState(initial);
  const [isBadLogin, setIsBadLogin] = useState(true);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    register(formData);
    setFormData(initial);
    // if(currentUser) navigate("/");
    if(currentUser) router.push("/")
    if(!currentUser) setIsBadLogin(false);
  }

  return (
    <div className="signupPage">
      <h3 className="mb-4">Sign Up</h3>
      <form className="SignUpForm" onSubmit={handleSubmit}>

        <div className="mb-3">
        <label className="mb-2 label">Username</label>
          <input
            id="username"
            name="username"
            className="form-control"
            placeholder="Enter username"
            onChange={handleChange}
            value={formData.username}
            aria-label="Username"
          />
        </div>
        <div className="mb-3">
        <label className="mb-2 label">Password</label>
          <input
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleChange}
            value={formData.password}
            aria-label="Password"
            type="password"
          />
        </div>
        <div className="mb-3">
        <label className="mb-2 label">First Name</label>
          <input
            id="firstName"
            name="firstName"
            className="form-control"
            placeholder="Enter first name"
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
            placeholder="Enter last name"
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
            placeholder="Enter email"
            onChange={handleChange}
            value={formData.email}
            aria-label="Email"
          />
        </div>
        {!isBadLogin &&
          <div class="alert alert-danger" role="alert">
            All fields must be filled out
          </div>
        }
        <div>
          <button className="btn btn-primary">
            Submit
          </button>
        </div>

      </form>
    </div>
  );
}

export default SignUpForm;
