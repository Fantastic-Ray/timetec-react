import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { fire } from "../firebase/FirebaseInit";
export default class SignIn extends Component {
  componentDidMount() {
    document.title = "Timetec Sign In";
  }

  state = {};
  render() {
    return (
      <div>
        <div
          style={{
            textAlign: "center",
            marginTop: "12%",
            marginLeft: "12%",
            marginRight: "12%"
          }}
        >
          <img
            src="image/logo.png"
            className="d-inline-block align-top"
            alt="Timetec Inc"
          />

          <h4>E-Commerce System</h4>
        </div>

        <div className="container">
          <br />

          <br />
          <div style={{ textAlign: "center" }}>
            <button
              id="loginBtn"
              onClick={authLogin}
              className="btn btn-md btn-primary"
              type="submit"
              style={{ width: "80%" }}
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    );
  }
}
function authLogin() {
  const email = "rayg@ttmemory.com";
  const password = "team1911";
  fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function() {
      //window.location = "dashboard";
      loadSpreadSheetAPI();
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...

      console.log("Error Code: " + errorCode);

      console.log("errorMessage" + errorMessage);
    });
}
function loadSpreadSheetAPI() {
  var config = fire.database().ref("config");
  config.once("value").then(function(snapshot) {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";
    var API_KEY = snapshot.val().GoogleAPIKey;
    console.log("API" + API_KEY);
    var CLIENT_ID = snapshot.val().GoogleClientIdReact;
    script.onload = () =>
      window.gapi.load("client:auth2", function() {
        var SCOPE = "https://www.googleapis.com/auth/spreadsheets";

        window.gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPE,
            discoveryDocs: [
              "https://sheets.googleapis.com/$discovery/rest?version=v4"
            ]
          })
          .then(function() {
            console.log("Client Init");
            window.gapi.auth2
              .getAuthInstance()
              .signIn()
              .then(function() {
                window.location = "dashboard";
              });
            //this.setState({ gapiReady: true });
          });
      });
    document.body.appendChild(script);
  });
}
