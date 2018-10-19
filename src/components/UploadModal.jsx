import React, { Component } from "react";

export default class UploadModal extends Component {
  render() {
    return (
      <div
        className="modal fade bd-example-modal-sm"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Daily Sales
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Date:
                  </label>
                  <input type="date" className="form-control" id="dateInput" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlFile1">
                    Example file input
                  </label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="dataFile"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
