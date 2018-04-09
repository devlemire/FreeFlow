import axios from 'axios'
import config from '../config'

const initialState = {
  user: null
}

const LOGIN = 'LOGIN'
const REGISTER = 'REGISTER'

export default function authReducer(state = initialState, action) {
  console.log('Incoming action:', action)
  switch (action.type) {
    case `${LOGIN}_FULFILLED`:
      return Object.assign({}, state, { user: action.payload.data.user })
    default:
      return state
  }
}

export function login(credentials) {
  return {
    type: LOGIN,
    payload: axios.post(config.api.auth.login, credentials)
  }
}
