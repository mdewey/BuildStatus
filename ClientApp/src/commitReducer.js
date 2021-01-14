// state is the current value of our state object

// action is the data we received from our dispatch
const reducerFunction = (state, action)=> {
  console.log({ action, state })

  switch (action.type) {
    
    default:

      return {...state}
  }
}

export default reducerFunction