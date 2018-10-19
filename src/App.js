import React, { Component } from "react";
import { fire } from "../src/firebase/FirebaseInit";
import Dashboard from "./views/Dashboard";
import SignIn from "./views/SignIn";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      gapiReady: false
    };
  }
  loadSpreadSheetAPI() {
    var config = fire.database().ref("config");
    config.once("value").then(
      function(snapshot) {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/client.js";
        var API_KEY = snapshot.val().GoogleAPIKey;
        var CLIENT_ID = snapshot.val().GoogleClientIdReact;
        script.onload = () =>
          window.gapi.load(
            "client:auth2",
            function() {
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
                .then(
                  function() {
                    console.log("Client Init");
                    this.setState({ gapiReady: true });
                  }.bind(this)
                );
            }.bind(this)
          );
        document.body.appendChild(script);
      }.bind(this)
    );
  }
  componentDidMount() {
    this.loadSpreadSheetAPI();
  }
  render() {
    if (this.state.gapiReady) {
      return (
        <BrowserRouter>
          <div>
            <Route
              exact={true}
              path="/"
              render={() => (
                <div className="App">
                  <SignIn />
                </div>
              )}
            />
            <Route
              exact={true}
              path="/dashboard"
              render={() => (
                <div className="App">
                  <Dashboard />
                </div>
              )}
            />
          </div>
        </BrowserRouter>
      );
    } else {
      return <div />;
    }
    /*return (
      <BrowserRouter>
        <div>
          <Route
            exact={true}
            path="/"
            render={() => (
              <div className="App">
                <SignIn />
              </div>
            )}
          />
          <Route
            exact={true}
            path="/dashboard"
            render={() => (
              <div className="App">
                <Dashboard />
              </div>
            )}
          />
        </div>
      </BrowserRouter>
    );*/
  }
}

export default App;
