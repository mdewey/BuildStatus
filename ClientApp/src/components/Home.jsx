import React, { Component } from "react";
import ProjectStatus from "./ProjectStatus";


export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <>
      <main>
        <ProjectStatus projectKey="website"/>
        <ProjectStatus projectKey="content"/>
      </main>
    </>
    );
  }
}
