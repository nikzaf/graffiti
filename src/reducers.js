import {combineReducers} from 'redux'

export default combineReducers({
  letter: (state = [], action) => {
    console.log(action)

    return state
  }
})
