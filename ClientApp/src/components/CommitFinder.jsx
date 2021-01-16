import React, { useEffect, useState } from "react";
import { useCommitContext } from "../useCommitContext";

const CommitFinder = () => {
  const { state, dispatch } = useCommitContext();
  const [results, setResults] = useState();
  const {commits, statues} = state
  const [productionIndex, setProductionIndex] = useState();
  const [stagingIndex, setStagingIndex] = useState();
  const [needle, setNeedle] = useState();
  const [matchingCommits, setMatchingCommits] = useState([]);
  useEffect(() => {
    console.log({needle});
    if (needle){
      const results = commits.map((m, index) => ({sha : m.sha,index })).filter(f => f.sha.startsWith(needle))
      console.log({results});
      setMatchingCommits(results)
    } else {
      setMatchingCommits([])
    }
  }, [needle])

  useEffect(() => {
    // find production index
    if (commits && statues){
      const production = commits.map((m, index) => ({sha : m.sha,index })).filter(f => f.sha === statues.production.commit)[0]
      const staging = commits.map((m, index) => ({sha : m.sha,index })).filter(f => f.sha === statues.staging.commit)[0]

      console.log('building cache', {production});
      if (production){
        console.log({production});
        setProductionIndex(production.index);
      }
      console.log('building cache', {staging});
      if (staging){
        console.log({staging});
        setStagingIndex(staging.index);
      }
    }

  },[state])

  const DeploymentStatus = (data) => {
    const {commit} = data
    console.log(commit);
    console.log({commit, stagingIndex, productionIndex});
    if (commit.index < stagingIndex && commit.index < productionIndex){
      return <p>not deployed</p>
    } if (commit.index >= stagingIndex && commit.index < productionIndex){
      return <p>in staging</p>
    }  if (commit.index >= productionIndex){
      return <p>in production</p>
    }else {
      return <p>unknown</p>
    }
  }
  return (
    <div>
      Search : <input type="search" onChange={e => setNeedle(e.target.value)}/>
      
        <section>
          <header>commits found</header>
          <ul>
            {matchingCommits.map(commit => {
              return <li>
                <p>{commit.sha}</p>
                <DeploymentStatus commit={commit}/>
              </li>
            })}
          </ul>
        </section>
      
      {/* <p>production is at {productionIndex}</p>
      <p>staging is at {stagingIndex}</p> */}
    </div>
  );
}

export default CommitFinder;
