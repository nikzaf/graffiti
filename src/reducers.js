import {combineReducers} from 'redux'
import {recognize} from './engine'

export default combineReducers({
  letter: (state = '', {type, payload}) => {
    if (type !== 'RECOGNIZE') return state

    const {points, size} = payload
    const letter = recognize(points, size)

    if (letter !== '' && !/^[A-Z]$/.test(letter)) {
      throw new Error('illegal letter')
    }

    return letter
  }
})
