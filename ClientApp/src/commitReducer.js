// state is the current value of our state object
import { BUILD_STATUS_LOADED, COMMITS_LOADED } from './actions'
// action is the data we received from our dispatch
const reducerFunction = (state, action) => {
  switch (action.type) {
    case BUILD_STATUS_LOADED:
      return { ...state, [action.projectKey]: { statuses: action.statuses, ...state[action.projectKey] } }
    case COMMITS_LOADED:
      return { ...state, [action.projectKey]: { commits: action.commits, ...state[action.projectKey] } }
    default:

      return { ...state }
  }
}

export default reducerFunction