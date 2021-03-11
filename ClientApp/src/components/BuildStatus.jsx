import React, { useEffect, useState } from "react";
import axios from "axios";
import {buildStatusLoaded} from '../actions'
import { useCommitContext } from "../useCommitContext";

const BuildStatus = () => {
  const { state, dispatch } = useCommitContext();
  const [staging, setStaging] = useState({});
  const [production, setProduction] = useState({});

  useEffect(() => {
    axios.get("/api/build").then((resp) => {
      const { data } = resp;
      const { staging, production } = data;
      console.log({staging, production});
      dispatch(buildStatusLoaded({staging, production}));
      setStaging(staging);
      setProduction(production);
    });
  }, []);
  const getTime = timeStamp => {
    const {data} = timeStamp || {}
    if (data){
      const date = new Date(1000* data[7].replace('BUILDTIME=', ''));
      return <>{date.toLocaleString()}</>
    }
    return <>...</>;
  }
  return (
    <>
      <h1 className="build-status">Build Status</h1>
      <div className="environments small-text">
        <div className="status">
          <p className="name"><a target="_blank" href="https://staging.va.gov/BUILD.txt">staging</a></p>
          <p>{staging.commit} </p>
          <p className="published-time">last updated at {getTime(state.statues?.staging)}</p>
        </div>
        <div className="status">
        <p className="name"><a target="_blank" href="https://va.gov/BUILD.txt">production</a></p>

          <p>{production.commit} </p>
          <p className="published-time">last updated at {getTime(state.statues?.production)}</p>
        </div>
      </div>
    </>
  );
};

export default BuildStatus;
