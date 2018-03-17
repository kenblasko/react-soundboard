import { 
  IS_PLAYING,
  HANDLE_ITEM_ADD, 
  HANDLE_ITEM_REMOVE, 
  HANDLE_ITEM_KEY_BIND_REMOVE,
  HANDLE_ITEM_KEY_BIND_EDIT,
  HANDLE_ITEM_KEY_BIND_SAVE,
  HANDLE_ITEM_KEY_ONCHANGE
} from '../actions/types'

const mutateItemByKey = (state, id, key, value) => {
  return state.map(item => {
    if (item.id === id) {
      return { ...item, [key]: value }
    }
    return item
  })
}

export default function(state = [], action) {
    switch (action.type) {
      case IS_PLAYING:
        return mutateItemByKey(state, action.payload.item.id, 'isPlaying', action.payload.isPlaying)
      case HANDLE_ITEM_KEY_BIND_EDIT:
        return mutateItemByKey(state, action.payload.item.id, 'isEditing', !action.payload.item.isEditing);
      case HANDLE_ITEM_KEY_BIND_SAVE:
        return mutateItemByKey(state, action.payload.item.id, 'keyAssigned', action.payload.keyAssigned);
      case HANDLE_ITEM_KEY_BIND_REMOVE:
        return mutateItemByKey(state, action.payload.item.id, 'keyAssigned', null);
      case HANDLE_ITEM_KEY_ONCHANGE:
        return mutateItemByKey(state, action.payload.item.id, 'keyEdittingValue', action.payload.value);
      case HANDLE_ITEM_ADD: 
        return [...state, action.payload]
      case HANDLE_ITEM_REMOVE: 
        return [...state.filter(i => i.id !== action.payload)]
      default: 
        return state
    }
}