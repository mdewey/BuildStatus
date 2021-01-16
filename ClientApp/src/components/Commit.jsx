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
  const Message = commitMessage => {
    console.log({commitMessage});
    const {message} = commitMessage
    return <p>{message.substring(0, 25)} {message.length > 25 ? "..." : ''}</p>
  }
  return (
    <li className={getCSSClass(flags)}>
        <p>{sha}</p>
        <Message message={message} />
        <p>{author.name} | {userName}</p>
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
