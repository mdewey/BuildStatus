import React from 'react';
import BuildStatus from "./BuildStatus";
import CommitFinder from "./CommitFinder";
import CommitHistory from "./CommitHistory";

const ProjectStatus = (props) => {
  const {projectKey} = props
  return (
    <section>
      <BuildStatus projectKey={projectKey}/>
      <CommitFinder/>
      <CommitHistory/>
    </section>
  );
}

export default ProjectStatus;
