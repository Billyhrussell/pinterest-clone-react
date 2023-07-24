import "../components/Navigation.css";
import React, { useState, useContext } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link, NavLink as RRNavLink, Router } from 'react-router-dom';
import Homepage from "./index";
import userContext from './userContext';

/** Displays Navigation bar with links to homepage, company list, and job list
 *
 * Props:
 * - logout: function called from parent
 *
 * State:
 * - isOpen: boolean
 *
 * App -> Navigation
 *
*/

function Navigation({ logout }) {
  const { currentUser } = useContext(userContext);
  console.log("CURRENT USER IN NAVIGATION: ", currentUser)
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // let username = currentUser.username
  function loggedIn() {
    return (
      <>
        {/* <NavItem>
          <NavLink to="/"
            activeclassname="active"
            tag={RRNavLink}>Home</NavLink>
        </NavItem> */}

        <NavItem>
          <NavLink to="" activeclassname="active" tag={RRNavLink}>
          Home
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to={`/${currentUser.username}`}
            activeclassname="active"
            tag={RRNavLink}>Profile</NavLink>
        </NavItem>


        <NavItem>
          <button
            className="nav-link"
            onClick={logout}>Log out, {currentUser.first_name}
          </button>
        </NavItem>

         {/* <NavItem>
          <Link pathname={`/user/${currentUser.username}`}> PROFILE</Link>
        </NavItem> */}

        {/* <Link href={{
          pathname: '/user/[username]',
          query: {username: `${currentUser.username}`}
        }}>
        PROFILEEEE
        </Link> */}
      </>
    );
  }

  function loggedOut() {
    return (
      <>
        <NavItem>
          <NavLink to="/login"
            activeclassname="active"
            tag={RRNavLink}>Login in</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/signup"
            activeclassname="active"
            tag={RRNavLink}>Sign Up</NavLink>
        </NavItem>
      </>
    );
  }

  return (
    <div>
      <Navbar color="white" light expand="md">
        <NavbarBrand href="/" style={{ color: "red" }}>Pinterest</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            {currentUser && loggedIn()}
            {!currentUser && loggedOut()}
          </Nav>
        </Collapse>
      </Navbar>
    </div>


  );
}


export default Navigation;