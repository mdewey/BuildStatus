import React, { useReducer } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import reducerFunction from "./commitReducer";
import { CommitContext } from "./useCommitContext";
import "./custom.css";

const App = () => {
  const [state, dispatch] = useReducer(reducerFunction, {});

  const ctxt = { state, dispatch };

  return (
    <CommitContext.Provider value={ctxt}>
      <Layout>
        <Route exact path="/" component={Home} />
      </Layout>
    </CommitContext.Provider>
  );
};

export default App;
