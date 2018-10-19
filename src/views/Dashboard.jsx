import React, { Component } from "react";
import Nav from "../components/Nav";

import PopperJs from "popper.js";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.css";
import { fire } from "../firebase/FirebaseInit";
import allData from "../components/DataFactory.js";
import SideNav from "../components/SideNav";
import "../dashboard.css";
import UploadModal from "../components/UploadModal";
import UploadSalesBar from "../components/UploadSalesBar";
import SalesBar from "../components/SalesBar";
import PieBar from "../components/PieBar";
import PnSBar from "../components/PnSBar";
export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastUpdate: "",
      lineLabel: [],
      lineData: [],
      pieData: [],
      pieLabel: [],
      typeItemTable: [],
      ready: false
    };
  }
  componentDidMount() {
    const caSalesData = fire.database().ref("Sales/CA");
    caSalesData.on(
      "value",
      function(snapshot) {
        let result = new allData(snapshot.val());
        var updateDate = result.getLastUpdate();
        var lineChartLabel = result.getLineChartLabel();
        var lineChartData = result.getLineChartData();
        var typeTable = result.getTypeSalesTable();
        var typeItemTable = result.getTypeItemsTable();
        var PnSTable = result.getPnSDataTable();
        var pieData = [];
        for (var i in typeTable) {
          pieData.push(typeTable[i]);
        }
        console.log("lineChartLabel " + lineChartLabel);
        console.log("lineChartData " + lineChartData);
        console.log("pieLabel " + Object.keys(typeTable));
        console.log("pieData " + pieData);
        this.setState({
          lastUpdate: updateDate,
          lineLabel: lineChartLabel,
          lineData: lineChartData,
          pieData: pieData,
          pieLabel: Object.keys(typeTable),
          typeTable: typeTable,
          PnSTable: PnSTable,
          typeItemTable: typeItemTable,
          ready: true
        });
      }.bind(this)
    );
  }

  render() {
    if (this.state.ready) {
      return (
        <div>
          <Nav />
          <DashBoardLayout
            lastUpdate={this.state.lastUpdate}
            lineLabel={this.state.lineLabel}
            lineData={this.state.lineData}
            pieLabel={this.state.pieLabel}
            pieData={this.state.pieData}
            typeItemTable={this.state.typeItemTable}
            PnSTable={this.state.PnSTable}
            ready={this.state.ready}
          />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

function DashBoardLayout(props) {
  console.log("PnS ready?" + props.ready);
  if (true) {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <SideNav />
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <UploadSalesBar lastUpdate={props.lastUpdate} />
              <SalesBar lineLabel={props.lineLabel} lineData={props.lineData} />
              <PieBar pieLabel={props.pieLabel} pieData={props.pieData} />
              <PnSBar
                types={props.pieLabel}
                typeItemTable={props.typeItemTable}
                PnSTable={props.PnSTable}
              />
              <br />
              <div className="row" id="myCanvasDiv" />
            </main>
          </div>
        </div>
        <div />
        <UploadModal />
      </div>
    );
  } else {
    return <div />;
  }
}
function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    console.log("Google log in");
    //window.location = "dashboard";
  } else {
    console.log("logged out then log in");
    //window.gapi.auth2.getAuthInstance().signIn();
  }
}
