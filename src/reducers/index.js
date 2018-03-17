import { combineReducers } from 'redux'
import itemsReducer from './items'
import uploadReducer from './upload'
import appStateReducer from './app'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    app: appStateReducer,
    items: itemsReducer,
    upload: uploadReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer