import React from 'react';

const Commit = ({data, flags}) => {
  console.log(flags);
  const {sha, commit} = data 
  const {author, message} = commit
  const userName = data.author.login
  const isProductionCommit = flags.isProduction;
  const isStagingCommit = flags.isStaging;
  const getCSSClass = (flags) => {
    let css = ""
    if (flags.hasStagingBeenFound){
     css ="on-staging" 
    }
    if (flags.hasProductionBeenFound){
      css ="on-production" 
     }
    if (flags.isProduction){
      css = "is-production"
    }
    if (flags.isStaging){
      css ="is-staging"
    }
    return `commit ${css}`
  }
  return (
    <li className={getCSSClass(flags)}>
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
