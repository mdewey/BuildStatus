import React, { useEffect, useState } from "react";
import { useCommitContext } from "../useCommitContext";

const CommitFinder = () => {
  const { state, dispatch } = useCommitContext();
  const [results, setResults] = useState();
  const {commits, statues} = state
  const [productionIndex, setProductionIndex] = useState();
  const [stagingIndex, setStagingIndex] = useState();
  const [needle, setNeedle] = useState("");
  const [matchingCommits, setMatchingCommits] = useState([]);
  useEffect(() => {
    if (needle){
      const results = commits.map((m, index) => ({sha : m.sha,index })).filter(f => f.sha.startsWith(needle))
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

      if (production){
        setProductionIndex(production.index);
      }
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
      return <p className="on-staging">in staging</p>
    }  if (commit.index >= productionIndex){
      return <p className="on-production">in production</p>
    }else {
      return <p>unknown</p>
    }
  }
  return (
    <div>
      <hr/>
      Search : <input type="search" onChange={e => setNeedle(e.target.value)} value={needle}/>
      <button onClick={() => setNeedle("")}>clear results</button>
       {matchingCommits.length > 0 && <section>
          <em>results</em>
          <ul>
            {matchingCommits.map(commit => {
              return <li className="search-result">
                <p>{commit.sha}</p>
                <DeploymentStatus commit={commit}/>
              </li>
            })}
          </ul>
      </section>}
      {(matchingCommits.length === 0 && needle.length > 0) && <em>no commits found</em>}
      <hr/>
    </div>
  );
}

export default CommitFinder;
