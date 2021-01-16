import React, { useEffect, useState } from "react";
import axios from "axios";
import {buildStatusLoaded} from '../actions'
import { useCommitContext } from "../useCommitContext";
import Commit from "./Commit";


const CommitHistory = () => {
  const { state, dispatch } = useCommitContext();
  
  const [commits, setCommits] = useState([]);
  useEffect(() => {
    axios.get('/api/commit').then(resp => {
      setCommits(resp.data.commits)
    })
    
  }, []);
  return (
    <div>
      <header>latest {commits.length} commits</header>
      <ul>
        {commits.map((commit, index) => {
          return <Commit data={commit} key={index}/>
        })}
        </ul>  
    </div>
  );
}

export default CommitHistory;
