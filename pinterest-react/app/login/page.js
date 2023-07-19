"use client"
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation"

// import "./LoginForm.css";
// import userContext from "../../components/userContext";
import userContext from "../../components/userContext"
console.log("USERCONTEXT", userContext)

/** Form for logging in.
 *
 * Props:
 * - login: function to call in parent.
 *
 * State:
 * - formData
 *
 * RoutesList -> LoginForm
 */

// FIXME: change curr user once have avail
function LoginForm({ login }) {


  console.log(login, "lOGIN")
  const { currentUser } = useContext(userContext);
  // let currentUser = false;
  const initial = { username: "", password: "" };
  const navigate = useNavigate();
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
  async function handleSubmit(evt) {
    evt.preventDefault();
    await login(formData);
    setFormData(initial);
    console.log("CURR USER in handlesubmit:", currentUser);
    // FIXME: there is no "/", so there is an error
    if (currentUser) navigate("/");
    // if(currentUser) router.push("/");
    if (!currentUser) setIsBadLogin(false);
  }

  return (
    <div className="loginPage">
      <h3 className="mb-4">Log In</h3>
      <form className="LoginForm" onSubmit={handleSubmit}>

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
        {!isBadLogin &&
          <div class="alert alert-danger" role="alert">
            Incorrect Username or Password
          </div>
        }
        <div className="mb-3">
          <button className="btn btn-primary">
            Submit
          </button>
        </div>

      </form>
    </div>
  );
  // return (
  //   <>
  //     <div>
  //       hello
  //     </div>
  //   </>
  // )
}

export default LoginForm;
