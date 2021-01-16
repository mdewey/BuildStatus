import React, { useEffect, useState } from "react";
import axios from "axios";
import {buildStatusLoaded} from '../actions'
import { useCommitContext } from "../useCommitContext";
import Commit from "./Commit";


const CommitHistory = () => {
  const { state, dispatch } = useCommitContext();
  console.log({state});
  let productionSha;
  let stagingSha;
  

  if (state.statues){
    console.log('in if', {state});
    productionSha = state.statues.production.commit
    stagingSha = state.statues.staging.commit
  }
  
  const [commits, setCommits] = useState([]);
  useEffect(() => {
    axios.get('/api/commit').then(resp => {
      setCommits(resp.data.commits)
    })
    
  }, []);
  console.log({productionSha});
  return (
    <div>
      <header>latest {commits.length} commits</header>
      <ul>
        {commits.map((commit, index) => {
          return <Commit data={commit} key={index} productionSha={productionSha} stagingSha={stagingSha} />
        })}
        </ul>  
    </div>
  );
}

export default CommitHistory;
