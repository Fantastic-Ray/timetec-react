import React, { Component } from "react";

export default class UploadSalesBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2" id="Top">
          Last Update:
          {this.props.lastUpdate}
        </h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group mr-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              data-toggle="modal"
              data-target=".bd-example-modal-sm"
            >
              Upload
            </button>
          </div>
          <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar" />
            This week
          </button>
        </div>
      </div>
    );
  }
}
