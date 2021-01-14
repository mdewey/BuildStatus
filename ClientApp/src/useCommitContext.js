
  
import { createContext, useContext } from 'react'


// Used to setup the provider
export const CommitContext = createContext()

// Used to be able to get data from the context
export const useCommitContext = () => useContext(CommitContext)