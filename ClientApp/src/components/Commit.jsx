import React from 'react';

const Commit = ({data, flags}) => {
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
    const {message} = commitMessage
    const numberToTake = 50
    return <p className="message">{message.substring(0, numberToTake)} {message.length > numberToTake ? "..." : ''}</p>
  }
  return (
    <li className={getCSSClass(flags)}>
      <section className="data">
        <Message message={message} />
        <p className="small-text">{author.name} | {userName}</p>
        <p className="small-text">
          <a href={`https://github.com/department-of-veterans-affairs/vets-website/commit/${sha}`}
          target="_blank">
            {sha}
          </a>
        </p>
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
