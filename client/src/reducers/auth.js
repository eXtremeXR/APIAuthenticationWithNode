import { 
  AUTH_SIGN_UP, 
  AUTH_SIGN_OUT, 
  AUTH_SIGN_IN, 
  AUTH_ERROR } from '../actions/types';

const DEFAULT_STATE = {
  isAuthenticated: false,
  token: '',
  errorMessage: ''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case AUTH_SIGN_UP:
      return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '' }
    case AUTH_SIGN_IN:
      return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '' }
    case AUTH_SIGN_OUT:
      return { ...state, token: action.payload, isAuthenticated: false, errorMessage: '' }
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload }
    default:
      return state
  }
}