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
      dispatch(buildStatusLoaded({staging, production}));
      setStaging(staging);
      setProduction(production);
    });
  }, []);
  return (
    <>
      <div>
        <h1>staging</h1>
        <p>current commit:{staging.commit} </p>
      </div>
      <div>
        <h1>production</h1>
        <p>current commit:{production.commit} </p>
      </div>
    </>
  );
};

export default BuildStatus;
