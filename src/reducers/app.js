import {
  KEY_PRESS,
  HANDLE_ERROR,
  IS_EDITING,
  UPDATE_KEY_BINDINGS,
} from '../actions/types'

const globalState = {
  keyPressed: '',
  errorMessage: false,
  isEditing: false,
  existingBindings: {}
}

export default function(state = globalState, action) {
  switch (action.type) {
    case KEY_PRESS:
      return {...state, keyPressed: action.key}
    case HANDLE_ERROR:
      return {...state, errorMessage: action.error || action.payload}
    case IS_EDITING:
      return {...state, isEditing: action.isEditing}
    case UPDATE_KEY_BINDINGS:
      return {...state, existingBindings: action.newBindings}
    default:
      return state
  }
}