import React, { useEffect, useState } from "react";
import axios from "axios";
import {buildStatusLoaded} from '../actions'
import { useCommitContext } from "../useCommitContext";

const BuildStatus = (props) => {
  const {projectKey} = props
  const { dispatch } = useCommitContext();
  const [staging, setStaging] = useState({});
  const [production, setProduction] = useState({});

  useEffect(() => {
    axios.get(`/api/build/${projectKey}`).then((resp) => {
      const { data } = resp;
      const { staging, production } = data;
      console.log({staging, production});
      dispatch(buildStatusLoaded(projectKey, {staging, production}));
      setStaging(staging);
      setProduction(production);
    });
  }, [projectKey, dispatch]);

  
  const getTime = environment => {
    if (environment){
      const {data} = environment;
      if (!data) return <>...</>;
      const date = new Date(1000 * data[7].replace('BUILDTIME=', ''));
      return <>{date.toLocaleString()}</>
    }
    return <>...</>;
  }

  return (
    <>
      <h1 className="build-status">{projectKey} Build Status</h1>
      <div className="environments small-text">
        <div className="status">
          <p className="name"><a target="_blank" rel="noopener noreferrer" href={staging.url}>staging</a></p>
          <p>{staging.commit} </p>
          <p className="published-time">last updated at {getTime(staging)}</p>
        </div>
        <div className="status">
        <p className="name"><a target="_blank" rel="noopener noreferrer" href={production.url}>production</a></p>

          <p>{production.commit} </p>
          <p className="published-time">last updated at {getTime(production)}</p>
        </div>
      </div>
    </>
  );
};

export default BuildStatus;
