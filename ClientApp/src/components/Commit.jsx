import React from 'react';

const Commit = ({data}) => {
  console.log({data});
  const {sha, commit} = data 
  const {author, message} = commit
  const userName = data.author.login
  return (
    <li>
      <section className="sha">
        <label>sha</label>
        <p>{sha}</p>
      </section>
      <section className="message">
        <label>message</label>
        <p>{message}</p>
      </section>
      <section className="author">
        <label>who</label>
        <p>{author.name} | {userName}</p>
      </section>
    </li>
  )
}

export default Commit;
