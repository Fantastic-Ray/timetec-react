export default class allData {
  constructor(allData) {
    this.allData = allData;
    this.dates = Object.keys(this.allData);
    console.log("dates " + this.dates);
    var index = this.dates.indexOf("0");
    if (index > -1) {
      this.dates.splice(index, 1);
    }
    this.salesQTY = [];
    this.typeSaleTable = [];
    this.typeItemsTable = [];
    this.PnSDataTable = [];

    for (var child in this.allData) {
      //console.log("Child" + child);
      //console.log(this.allData[child]);
      if (child !== "0") {
        var sum = 0;
        for (var child2 in this.allData[child]) {
          // get sales qty data
          sum += this.allData[child][child2].QTY;
          // get item type data
          var type = getItemType(child2);
          if (this.typeSaleTable[type]) {
            this.typeSaleTable[type] += this.allData[child][child2].QTY;
            if (this.typeItemsTable[type].includes(child2) === false) {
              this.typeItemsTable[type].push(child2);
              //console.log("this.typeItemsTable pushed " + type+ " " +child2 );
            }
          } else {
            this.typeSaleTable[type] = 0;
            this.typeSaleTable[type] += this.allData[child][child2].QTY;
            this.typeItemsTable[type] = [];
            this.typeItemsTable[type].push(child2);
            //console.log("this.typeItemsTable pushed first Time " + type+ " " +child2 );
          }
          // get price and sales data
          //console.log("sku: " + child2);
          //console.log("sku - price  " + this.allData[child][child2].Price + " qty " +this.allData[child][child2].QTY);

          if (this.PnSDataTable[child2]) {
            if (this.PnSDataTable[child2][this.allData[child][child2].Price]) {
              this.PnSDataTable[child2][this.allData[child][child2].Price].push(
                this.allData[child][child2].QTY
              );
            } else {
              this.PnSDataTable[child2][this.allData[child][child2].Price] = [];
              this.PnSDataTable[child2][this.allData[child][child2].Price].push(
                this.allData[child][child2].QTY
              );
            }
          } else {
            this.PnSDataTable[child2] = [];
            this.PnSDataTable[child2][this.allData[child][child2].Price] = [
              this.allData[child][child2].QTY
            ];
          }
        }
        this.salesQTY.push(sum);
      }
    }
    var options = "";
    for (var t = 0; t < Object.keys(this.typeSaleTable).length; t++) {
      options +=
        "<option value='" +
        Object.keys(this.typeSaleTable)[t] +
        "'>" +
        Object.keys(this.typeSaleTable)[t] +
        "</option>";
    }
  }

  getLastUpdate() {
    var lastUpdateDate =
      this.dates[this.dates.length - 1].substring(0, 2) +
      "/" +
      this.dates[this.dates.length - 1].substring(2, 4) +
      "/" +
      this.dates[this.dates.length - 1].substring(4, 8);
    console.log("Last update" + lastUpdateDate);
    return lastUpdateDate;
  }
  getLineChartLabel() {
    return this.dates;
  }
  getLineChartData() {
    return this.salesQTY;
  }
  getTypeSalesTable() {
    return this.typeSaleTable;
  }
  getTypeItemsTable() {
    return this.typeItemsTable;
  }
  getPnSDataTable() {
    return this.PnSDataTable;
  }
}
function getItemType(item) {
  var type = "";
  if (item.includes("AP")) {
    type += "Apple ";
  }
  if (item.substring(0, 1) === "3") {
    type += "SSD";
  } else if (item.substring(0, 2) === "75") {
    type += "DIMM";
  } else if (item.substring(0, 2) === "76" || item.substring(0, 2) == "78") {
    type += "SODIMM";
  } else {
    type = "Other";
  }
  if (type !== "SSD") {
    if (parseInt(item.substring(4, 6)) <= 20) {
      type += " DDR3";
    } else {
      type += " DDR4";
    }
  }
  return type;
}
