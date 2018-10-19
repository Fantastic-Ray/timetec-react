import React, { Component } from "react";
import { Line } from "react-chartjs-2";
export default class SalesLineChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="line">
        <Line
          data={{
            labels: this.props.label,
            datasets: [
              {
                data: this.props.data,
                lineTension: 0,
                backgroundColor: "transparent",
                borderColor: "#007bff",
                borderWidth: 3,
                pointBackgroundColor: "#007bff"
              }
            ]
          }}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "Units ordered Sales"
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: false
                  }
                }
              ]
            },
            legend: {
              display: false
            }
          }}
          height={500}
          width={600}
        />
      </div>
    );
  }
}
