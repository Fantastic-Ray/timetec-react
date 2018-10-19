import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
export default class PieBar extends Component {
  constructor(props) {
    super(props);
    console.log("props " + this.props.pieData);
  }
  render() {
    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2" id="typePie">
            Item Type Proportion Pie
          </h1>
        </div>
        <br />
        <PieChart pieData={this.props.pieData} pieLabel={this.props.pieLabel} />
      </div>
    );
  }
}
function PieChart(props) {
  return (
    <div>
      <Doughnut
        data={{
          datasets: [
            {
              data: props.pieData,
              backgroundColor: [
                "#8b008b",
                "#1e90ff",
                "#b22222",
                "#fffaf0",
                "#ffd700",
                "#ff8c00",
                "#8fbc8f"
              ]
            }
          ],
          labels: props.pieLabel
        }}
      />
    </div>
  );
}
