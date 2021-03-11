import React from 'react';

const Commit = ({data, flags}) => {
  const {sha, commit} = data 
  const {author, message} = commit
  const when = new Date(commit.author.date)

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
        
        <div className="small-text user">
          <a href={`https://www.github.com/${userName}`} target="_blank">
              <img className="github-image" src={`https://www.github.com/${userName}.png`} alt=""/>
              {author.name}
          </a>
        </div>  
        <div className="small-text sha">
          <div>
            <a href={`https://github.com/department-of-veterans-affairs/vets-website/commit/${sha}`}
              target="_blank">
              {sha}
            </a>
          </div>
          <p className="smaller-text">merged at {when.toLocaleString()}</p>
        </div>
      </section>
      {/* {isProductionCommit && (
        <p>PRODUCTION</p>
      )}
       {isStagingCommit && (
        <p>STAGING</p>
      )} */}
    </li>
  )
}

export default Commit;
