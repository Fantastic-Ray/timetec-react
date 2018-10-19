import React, { Component } from "react";
import { Line } from "react-chartjs-2";
export default class PnSChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Line
        data={{
          labels: this.props.priceList,
          datasets: [
            {
              label: "Daily Average Sales",
              data: this.props.salesList,
              lineTension: 0,
              backgroundColor: "transparent",
              borderColor: "#007bff",
              borderWidth: 3,
              pointBackgroundColor: "#007bff",
              yAxesID: "y-axis-1"
            },
            {
              label: "Daily Average Profit",
              borderColor: "#ffd700",
              backgroundColor: "#ffd700",
              fill: false,
              data: this.props.profitData,
              yAxisID: "y-axis-2"
            }
          ]
        }}
        width={900}
        height={380}
        options={{
          responsive: true,
          hoverMode: "index",
          stacked: false,
          title: {
            display: true,
            text: this.props.id
          },
          scales: {
            yAxes: [
              {
                type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: "left",
                id: "y-axis-1",
                ticks: {
                  beginAtZero: false
                }
              },
              {
                type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: "right",
                id: "y-axis-2",

                // grid line settings
                gridLines: {
                  drawOnChartArea: false // only want the grid lines for one axis to show up
                }
              }
            ]
          },
          legend: {
            //display: false,
          }
        }}
      />
    );
  }
}
