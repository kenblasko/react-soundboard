import {
  FILE_UPLOAD_INIT, 
  FILE_UPLOAD_ERROR, 
  FILE_UPLOAD_COMPLETE, 
  FILE_UPLOAD_PROGRESS,
  FILE_UPLOAD_RESET,
  HANDLE_ITEM_ADD, 
  HANDLE_ITEM_ERROR
} from './types'

import {
  delay
} from '../utils/helpers'

import firebase from '../firebase'

const storage = firebase.storage().ref();
const db = firebase.database()

export function onFileUpload(acceptedFiles, rejectedFiles) {
  return (dispatch) => {
    dispatch(fileUploadInit());

    if (rejectedFiles.length > 0) { // We should really never hit here, but just incase
      dispatch(handleFileUploadError('Invalid file format, only audio is allowed'))
      return delay(3000).then(() => {
        dispatch(fileUploadReset())
      })
    }
    acceptedFiles.forEach((file, index) => {
      processUpload(file, index, dispatch)
    });
  }
}

export function processUpload(file, index, dispatch) {
  const name = file.name;
  const metadata = { contentType: file.type };

  storage.child(name).getDownloadURL()
    .then((url) => { // Exists so update but don't save to DB
      storage.child(name).put(file, metadata)
        .then(snapshot => {
          dispatch(fileUploadComplete('File exists - updated metadata.'))
          delay(3000).then(() => dispatch(fileUploadReset()))
        });
    }) 
    .catch((err) => { // Not found so add
      const task = storage.child(name).put(file, metadata)
      task.on('state_changed', snapshot => {
        dispatch(fileUploadProgress(snapshot.bytesTransferred, snapshot.totalBytes))
      });
      task.then(snapshot => {
        if (snapshot.state === 'success') {
          const item = { name, url: snapshot.downloadURL }
          saveToDb(item, dispatch);
        } else {
          dispatch(handleFileUploadError('File was not saved.'))
          return delay(3000).then(() => dispatch(fileUploadReset()))
        }
      })
      .catch(err => {
        dispatch(handleFileUploadError(err.toString()))
        return delay(3000).then(() => dispatch(fileUploadReset()))
      });
    })
}

export function saveToDb(item, dispatch) {
  db.ref('files').push(item)
    .then(res => {
      let id = res.getKey()
      dispatch(fileUploadComplete('File uploaded successfully!'));
      dispatch(itemAdd(id, item));
      delay(3000).then(() => dispatch(fileUploadReset()))
    })
    .catch(error => {
      dispatch(handleItemError(error.toString()))
    });
}

export function fileUploadProgress(transferred, total) {
  return {
    type: FILE_UPLOAD_PROGRESS, 
    percent: Math.floor(transferred / total * 100) 
  }
}

export function itemAdd(id, item) {
  return { 
    type: HANDLE_ITEM_ADD,
    payload: { id, ...item } 
  }
}

export function handleItemError(error) {
  return { 
    type: HANDLE_ITEM_ERROR, 
    payload: error
  }
}

export function fileUploadInit() {
  return { 
    type: FILE_UPLOAD_INIT 
  }
}

export function fileUploadComplete(message) {
  return { 
    type: FILE_UPLOAD_COMPLETE, 
    message 
  }
}

export function fileUploadReset() {
  return { 
    type: FILE_UPLOAD_RESET 
  }
}

export function handleFileUploadError(error) {
  return { 
    type: FILE_UPLOAD_ERROR, 
    error
  }
}