import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import debounce from 'debounce'
import actions from '../actions'
import Dropzone from 'react-dropzone'
import {maxFileSize} from '../config'

import Item from '../components/Item'
import ProgressBar from '../components/ProgressBar'
import Header from '../components/static/Header'
import Footer from '../components/static/Footer'

class App extends Component {  

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      debounce(this.props.keyPress(e.key), 250)
    })
    document.addEventListener('keyup', (e) => {
      if (e.repeat) return;
      debounce(this.props.keyPress(''), 250)
    })
  }

  render() {
    const { 
      editKeyBinding, 
      unbindKey, 
      setIsPlaying,
      handleChange,
      items,
      addKeyBinding,
      removeKeyBinding,
      app: {
        isEditing,
        errorMessage,
        keyPressed,
        existingBindings
      }, 
      upload: {
        percent, 
        error, 
        message
      } 
    } = this.props;

    const keyBindingsByLetters = Object.keys(existingBindings).map(id => existingBindings[id])

    return (
      <main>
        <Header />
        <div className="container section">
          {errorMessage && <div className="notification is-danger">{errorMessage}</div>}
          {error && <div className="notification is-danger">{error}</div>}
          {message && <div className="notification is-primary">{message}</div>}
          {percent > 0 && <ProgressBar value={percent} /> }
          <Dropzone className="dropzone" 
            onDrop={this.props.onFileUpload} 
            accept="audio/*" 
            maxSize={maxFileSize}  
            multiple={false}>
            <div className="has-text-centered has-text-primary section">
              Drag an audio file here or click to upload!  1 MB limit.
            </div>
          </Dropzone>
          {items.length > 0 && 
            <div className="section columns is-multiline">
              {items.map((item, index) => 
                  <Item key={item.id || index} 
                    item={item}
                    keyPressed={keyPressed}
                    editKeyBinding={editKeyBinding}
                    unbindKey={unbindKey}
                    setIsPlaying={setIsPlaying}
                    handleChange={handleChange}
                    removeKeyBinding={removeKeyBinding}
                    addKeyBinding={addKeyBinding}
                    preventKeyPress={isEditing} 
                    existingBindings={existingBindings}
                    keyBindingsByLetters={keyBindingsByLetters}/>)}
            </div>}
        </div>
        <Footer />
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {
    keyPressed: state.keyPressed,
    upload: state.upload,
    items: state.items,
    app: state.app
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
