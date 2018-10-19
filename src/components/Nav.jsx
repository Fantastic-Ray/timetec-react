import React, { Component } from "react";
import PopperJs from "popper.js";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import { fire } from "../firebase/FirebaseInit";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { Name: "Not logged in" };
  }

  componentDidMount() {
    let name = "";
    fire.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          console.log("user logged in ");
          console.log(user);
          name = user.displayName;
          this.setState({ Name: name });
          //this.setState({ Name: user.displayName });
          let email = user.email;

          let uid = user.uid;

          console.log("name: " + this.state.Name);
          console.log("email: " + email);
          console.log(uid);
          this.setState({ Name: name });
          console.log("in did mount");
          //window.location = "dashboard";
        } else {
          console.log("not logged in");
          window.location = "/";
        }
      }.bind(this)
    );
  }

  render() {
    return (
      <div>
        <NavBar name={this.state.Name} />
      </div>
    );
  }
}
export default Nav;

function NavBar(props) {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light flex-md-nowrap p-0 shadow">
      <a className="navbar-brand" href="/">
        <img
          src="/image/ICON.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        Timetec Inc
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li id="listingPage">
            <a className="nav-link" href="dashboard">
              Dashboard
            </a>
          </li>
          <li id="dataPage">
            <a className="nav-link" href="data">
              Memory Data
            </a>
          </li>
          <li id="listingPage">
            <a className="nav-link" href="listing">
              Listing
            </a>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              FBA
            </a>

            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item" href="/FBAPlan">
                FBA Shipping Plan
              </a>
              <a className="dropdown-item" href="/fba">
                FBA Shipping Slip
              </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {props.name}
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a
                className="dropdown-item"
                href="signIn"
                onClick={firebaseSignOut}
              >
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function firebaseSignOut() {
  fire
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
    });
}
