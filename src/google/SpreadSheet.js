import { fire } from "../firebase/FirebaseInit";
export default class SpreadSheet {
  constructor() {}
  getPCCost() {
    var result = updateSignInStatus();

    return result;
  }
}
function updateSignInStatus() {
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
            costList[row[3]] = row[5];
          }
          return costList;
          //console.log("costList in spreadsheet" + costList);
          return costList;
        } else {
          console.log("no data from PC 2018");
        }
      },
      function(response) {
        //appendPre('Error: ' + response.result.error.message);
      }
    );
}
