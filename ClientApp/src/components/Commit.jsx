import React from 'react';

const Commit = ({data, productionSha, stagingSha}) => {
  const {sha, commit} = data 
  const {author, message} = commit
  const userName = data.author.login
  const isProductionCommit = productionSha === sha;
  const isStagingCommit = stagingSha === sha;
  return (
    <li>
      <section className="sha">
        <label>sha</label>
        <p>{sha}</p>
      </section>
      {/* <section className="message">
        <label>message</label>
        <p>{message}</p>
      </section> */}
      <section className="author">
        <label>who</label>
        <p>{author.name} | {userName}</p>
      </section>
      {isProductionCommit && (
        <p>PRODUCTION</p>
      )}
       {isStagingCommit && (
        <p>STAGING</p>
      )}
    </li>
  )
}

export default Commit;
