import React, { Component } from "react";
import SalesLineChart from "../components/SalesChart.jsx";
export default class SalesBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2" id="Sales">
            Sales Dashboard
          </h1>
        </div>
        <SalesLineChart
          label={this.props.lineLabel}
          data={this.props.lineData}
        />
      </div>
    );
  }
}
