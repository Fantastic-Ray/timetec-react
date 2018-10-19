import React, { Component } from "react";

import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = { activeID: "salesNav" };
  }
  handleClick = e => {
    this.setState({ activeID: e.target.id });
    console.log("E is ");
    console.log(e.target.id);
  };
  render() {
    const navLinkStyle = {};
    return (
      <nav
        className="col-md-2 d-none d-md-block bg-light sidebar"
        style={{ position: "fixed" }}
      >
        <div
          className="sidebar-sticky"
          style={{
            position: "relative",
            top: 0,
            height: "calc(100vh - 48px)",
            paddingTop: ".5rem",
            overflowX: "hidden",
            overflowY: "auto",
            textAlign: "left",
            verticalAlign: "text-bottom"
          }}
        >
          <ul className="nav flex-column">
            <li className="nav-item">
              <a
                id="sales"
                className={
                  "nav-link " + (this.state.activeID == "sales" ? "active" : "")
                }
                href="#Sales"
                style={navLinkStyle}
                onClick={this.handleClick}
              >
                <span data-feather="Sales Dashboard" />
                Sales Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a
                id="typeNav"
                className={
                  "nav-link " +
                  (this.state.activeID == "typeNav" ? "active" : "")
                }
                href="#typePie"
                style={navLinkStyle}
                onClick={this.handleClick}
              >
                <span data-feather="Item Type Proportion" />
                Item Type Proportion
              </a>
            </li>
            <li className="nav-item">
              <a
                id="PnSNav"
                className={
                  "nav-link " +
                  (this.state.activeID == "PnSNav" ? "active" : "")
                }
                href="#PnS"
                style={navLinkStyle}
                onClick={this.handleClick}
              >
                <span data-feather="Price And Sales Analysis" />
                Price And Sales Analysis
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={navLinkStyle}>
                <span data-feather="users" />
                Customers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={navLinkStyle}>
                <span data-feather="bar-chart-2" />
                Reports
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={navLinkStyle}>
                <span data-feather="layers" />
                Integrations
              </a>
            </li>
          </ul>

          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Saved reports</span>
            <a
              className="d-flex align-items-center text-muted"
              href="#"
              style={navLinkStyle}
            >
              <span data-feather="plus-circle" />
            </a>
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link" href="#" style={navLinkStyle}>
                <span data-feather="file-text" />
                Current month
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={navLinkStyle}>
                <span data-feather="file-text" />
                Last quarter
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={navLinkStyle}>
                <span data-feather="file-text" />
                Social engagement
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={navLinkStyle}>
                <span data-feather="file-text" />
                Year-end sale
              </a>
            </li>
          </ul>
          <div style={{ bottom: 0, position: "absolute" }}>
            <p className="navbar-text">Developer: Ruigang Gu</p>
            <p className="navbar-text">Version: React 1.1</p>
          </div>
        </div>
      </nav>
    );
  }
}
export default SideNav;
