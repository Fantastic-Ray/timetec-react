import React, { Component } from "react";
import SpreadSheet from "../google/SpreadSheet";
import PnSChart from "../components/PnSChart";

export default class PnSBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "DIMM DDR3",
      typeItemTable: this.props.typeItemTable,
      PnSTable: [],
      costList: [],
      costListReady: false
    };
    console.log("types are " + JSON.stringify(this.props.types));
  }
  handleChange = e => {
    this.setState({ selectedValue: e.target.value });
    console.log("selected value changed" + e.target.value);
  };
  componentDidMount() {
    this.setState({
      typeItemTable: this.props.typeItemTable
    });
    var costList = [];
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: "1Tz5Scf0dLG1XcozUghbCWfezSxxS7UVwdj5d3BaDYqs",
        range: "Master!A3:F"
      })
      .then(
        function(response) {
          var range = response.result;
          //console.log("spraedsheet result" + response.result);
          if (range.values.length > 0) {
            for (var i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              //console.log("spraedsheet result" + row[3]);
              // Print columns A and E, which correspond to indices 0 and 4.
              if (costList[row[3]]) {
                if (row[5]) {
                  if (row[5] < costList[row[3]]) {
                    costList[row[3]] = row[5];
                  }
                }
              } else {
                if (row[5]) {
                  costList[row[3]] = row[5];
                }
              }
            }
            this.setState({
              costList: costList,
              costListReady: true
            });
            //console.log("costList in spreadsheet" + costList);
          } else {
            console.log("no data from PC 2018");
          }
        }.bind(this),
        function(response) {
          //appendPre('Error: ' + response.result.error.message);
        }
      );
  }
  render() {
    if (this.state.costListReady) {
      return (
        <div>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2" id="PnS">
              Price And Sales Analysis
            </h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <select
                className="form-control"
                value={this.state.selectedValue}
                onChange={this.handleChange}
              >
                {this.props.types.map(function(type) {
                  return (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <br />

          <AllPnSChart
            typeItemTable={this.props.typeItemTable}
            selectedValue={this.state.selectedValue}
            PnSTable={this.props.PnSTable}
            costList={this.state.costList}
          />
        </div>
      );
    } else {
      return <div />;
    }
  }
}
function AllPnSChart(props) {
  const util = require("util");
  var PnSItemTable = [];
  var selectedType = props.selectedValue;
  var typeItemsTable = props.typeItemTable;
  //console.log("typeItemsTable " + typeItemsTable["DIMM DDR3"]);
  var PnSDataList = [];
  var PnSDataTable = props.PnSTable;
  var priceList;
  var chartList = [];
  console.log("cost list" + util.inspect(props.costList));
  for (var k in typeItemsTable[selectedType]) {
    var sku = typeItemsTable[selectedType][k];
    console.log("type SKU in AllPnS" + sku);
    priceList = Object.keys(PnSDataTable[sku]);
    PnSDataList = [];
    for (var p = 0; p < priceList.length; p++) {
      var sum = 0;
      for (var s = 0; s < PnSDataTable[sku][priceList[p]].length; s++) {
        sum += PnSDataTable[sku][priceList[p]][s];
      }
      var average = sum / PnSDataTable[sku][priceList[p]].length;
      PnSDataList.push(average);
    }

    PnSItemTable[sku] = { PriceList: priceList, AveSales: PnSDataList };
  }
  var counter = 0;
  for (var sku in PnSItemTable) {
    var costSKU = sku.split("K")[0];
    var profitList = [];
    for (var i = 0; i < PnSItemTable[sku].AveSales.length; i++) {
      console.log(sku);
      console.log("Price " + parseFloat(PnSItemTable[sku].PriceList[i]));
      console.log(
        "cost " + parseFloat(props.costList[costSKU].substring(1)) * 1.3
      );
      console.log("Ave Sales " + Number(PnSItemTable[sku].AveSales[i]));
      profitList.push(
        (parseFloat(PnSItemTable[sku].PriceList[i]) -
          parseFloat(props.costList[costSKU].substring(1)) * 1.3) *
          PnSItemTable[sku].AveSales[i]
      );
    }
    console.log("profitList " + profitList);

    chartList.push(
      <div key={counter} className="col">
        <PnSChart
          key={sku}
          id={sku}
          priceList={PnSItemTable[sku].PriceList}
          salesList={PnSItemTable[sku].AveSales}
          profitData={profitList}
        />
      </div>
    );
    counter++;
    if (counter % 2 === 0) {
      chartList.push(<div key={counter + 100} className="w-100" />);
    }
  }

  return <div className="row">{chartList}</div>;
}
