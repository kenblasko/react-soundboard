import {
  KEY_PRESS,
  IS_PLAYING,
  IS_EDITING,
  HANDLE_ERROR,
  HANDLE_ITEM_KEY_BIND_REMOVE,
  HANDLE_ITEM_KEY_BIND_EDIT,
  HANDLE_ITEM_KEY_BIND_SAVE,
  HANDLE_ITEM_KEY_ONCHANGE,
  UPDATE_KEY_BINDINGS
} from './types'

import {
  setLocalStorage,
  bindingExists
} from '../utils/helpers'

export function addKeyBinding(item, value) {
  return (dispatch, getState) => {
    const {app: {existingBindings}, items} = getState()
    const matched = bindingExists(existingBindings, items, value)
    if (matched) {
      return dispatch(handleError(`${value} is already bound.  Unbind ${matched.name} before setting this new binding.`))
    }
    const newBindings = {...existingBindings, [item.id]: value}
    localStorage.setItem('_cbt_sb_keys', JSON.stringify(newBindings))
    dispatch(setKeyBinding(item, value))
    dispatch(updateKeyBindings(newBindings))
    dispatch(editKeyBinding(item))
  }
}

export function removeKeyBinding(item) {
  let binding = item.keyAssigned
  return (dispatch, getState) => {
    const {app: {existingBindings}, items} = getState()
    delete existingBindings[item.id]
    setLocalStorage(existingBindings)
    dispatch(handleKeyRemove(item))
    dispatch(updateKeyBindings(existingBindings))
    dispatch(editKeyBinding(item))
    items.forEach(i => {
      if (item.id !== i.id && i.isEditing) {
        dispatch(handleChange(i, binding))
      }
    })
  }
}

export function editKeyBinding(item) {
  return (dispatch, getState) => {
    dispatch(setKeyEdit(item))
    const isEditing = getState().items.find(i => i.isEditing)
    dispatch(setIsEditing(isEditing))
    if (!isEditing) {
      dispatch(handleError(''))
    }
    dispatch(keyPress(''))
  }
}

export function handleChange(item, value) {
  return (dispatch, getState) => {
    const { app: {existingBindings}, items } = getState()
    const matched = bindingExists(existingBindings, items, value)
    if (matched) {
      return dispatch(handleError(`${value} is already bound.  Unbind ${matched.name} before setting this new binding.`))
    }
    dispatch(handleError(''))
    dispatch(setItemKeyChange(item, value))
  }
}

export function setItemKeyChange(item, value) {
  return { 
    type: HANDLE_ITEM_KEY_ONCHANGE, 
    payload: { item, value } 
  }
}

export function setIsEditing(isEditing) {
  return { 
    type: IS_EDITING, 
    isEditing 
  }
}

export function setKeyEdit(item) {
  return { 
    type: HANDLE_ITEM_KEY_BIND_EDIT, 
    payload: { item } 
  }
}
export function setKeyBinding(item, keyAssigned) {
  return {
    type: HANDLE_ITEM_KEY_BIND_SAVE,
    payload: { item, keyAssigned } 
  }
}

export function keyPress(key) {
  return {
    type: KEY_PRESS,
    key
  }
}

export function setIsPlaying(item, isPlaying) {
  return { 
    type: IS_PLAYING,
    payload: { item, isPlaying }
  }
}

export function handleKeyRemove(item) {
  return {
    type: HANDLE_ITEM_KEY_BIND_REMOVE,
    payload: { item }
  }
}

export function handleError(error) {
  return { 
    type: HANDLE_ERROR, 
    payload: error
  }
}

export function updateKeyBindings(newBindings) {
  return {
    type: UPDATE_KEY_BINDINGS,
    newBindings
  }
}