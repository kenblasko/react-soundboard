import {
  FILE_UPLOAD_INIT, 
  FILE_UPLOAD_PROGRESS,
  FILE_UPLOAD_COMPLETE, 
  FILE_UPLOAD_ERROR,
  FILE_UPLOAD_RESET
} from '../actions/types'

const defaultState = {
  loading: false,
  percent: 0,
  message: '',
  error: ''
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case FILE_UPLOAD_INIT:
      return {...state, loading: true }
    case FILE_UPLOAD_PROGRESS:
      return {...state, percent: action.percent}
    case FILE_UPLOAD_COMPLETE:
      return {...state, message: action.message }
    case FILE_UPLOAD_ERROR:
      return {...state, error: action.error }
    case FILE_UPLOAD_RESET:
      return defaultState
    default:
      return state
  }
}
