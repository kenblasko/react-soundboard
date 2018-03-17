import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import createStore from './store'
import { Provider } from 'react-redux'
import firebase from './firebase'
import { getLocalStorage, setLocalStorage } from './utils/helpers'
import 'bulma/css/bulma.css'
import './index.css'

const db = firebase.database()

let localStorageProps = getLocalStorage() ? getLocalStorage(true) : []

const virtualProps = (file) => ({
  isEditing: false,
  isPlaying: false,
  keyEdittingValue: '',
  keyAssigned: localStorageProps && localStorageProps[file.id]
})

const addVirtualProps = (file) => ({
  ...file,
  ...virtualProps(file)
})

db.ref('files').once('value')
  .then(snapshot => {
    let data = snapshot.val()
    if (data) {
      let ids = Object.keys(data)
      if (ids) {
        const items = ids.map(id => ({ id, ...data[id] }))
        return render(items)
      }
    }
    return render()
  })
  .catch(err => {
    console.error(err)
    return render()
  })

function render(items = []) {
  if (items && localStorageProps) {
    // Verify that the localStorage key exists in our items incase something was deleted.
    // If deleted, remove it from localStorageProps and update localStorage
    const lsIds = Object.keys(localStorageProps)
    const itemIds = items.map(i => i.id)
    lsIds.forEach(key => {
      if (!itemIds.includes(key)) {
        delete localStorageProps[key]
        setLocalStorage(localStorageProps)
      }
    })
  }
  let globalState = { 
    isEditing: false, 
    existingBindings: localStorageProps 
  }
  const store = createStore({ 
    items: items.map(addVirtualProps), 
    app: globalState 
  })
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>, 
    document.getElementById('root')
  )

}
