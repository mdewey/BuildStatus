import React, { Component } from "react";
import BuildStatus from "./BuildStatus";
import CommitFinder from "./CommitFinder";
import CommitHistory from "./CommitHistory";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Is your commit deployed?</h1>
        <BuildStatus />
        <CommitFinder/>
        <CommitHistory/>
      </div>
    );
  }
}
