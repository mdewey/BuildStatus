// state is the current value of our state object
import { BUILD_STATUS_LOADED } from './actions'
// action is the data we received from our dispatch
const reducerFunction = (state, action) => {
  console.log({ action, state })

  switch (action.type) {
    case BUILD_STATUS_LOADED:
      return { ...state, statues: action.statues }
    default:

      return { ...state }
  }
}

export default reducerFunction