import React, { Component } from "react";
import BuildStatus from "./BuildStatus";
import CommitFinder from "./CommitFinder";
import CommitHistory from "./CommitHistory";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <BuildStatus />
        <CommitFinder/>
        <CommitHistory/>
      </div>
    );
  }
}
