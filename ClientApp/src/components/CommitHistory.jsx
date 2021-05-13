import React, { useEffect, useState } from "react";
import axios from "axios";
import {commitsLoaded} from '../actions'
import { useCommitContext } from "../useCommitContext";
import Commit from "./Commit";


const CommitHistory = (props) => {
  const { projectKey } = props
  const { state, dispatch } = useCommitContext();
  let productionSha;
  let stagingSha;

  if (state[projectKey]?.statuses){
    productionSha = state[projectKey].production?.commit
    stagingSha = state[projectKey].staging?.commit
  }
  
  const [commits, setCommits] = useState([]);
  useEffect(() => {
    axios.get(`/api/commit/${projectKey}`).then(resp => {
      setCommits(resp.data.commits)
      dispatch(commitsLoaded(projectKey, resp.data.commits))
    })
    
  }, []);
  let hasStagingBeenFound = false;
  let hasProductionBeenFound = false; 

  return (
    <div className="commits-container">
      <header>latest {commits.length} commits</header>
      <ul>
        {commits.map((commit, index) => {
          const isStaging = commit.sha === stagingSha;
          const isProduction = commit.sha === productionSha;
          if (isStaging){
            hasStagingBeenFound = true;
          }
          if (isProduction){
            hasProductionBeenFound = true;
          }
          return <Commit data={commit} key={index} flags={{hasStagingBeenFound, hasProductionBeenFound, isStaging, isProduction}}/>
        })}
        </ul>  
    </div>
  );
}

export default CommitHistory;
