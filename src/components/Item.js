import React, {Component} from 'react'
import ItemInput from './ItemInput'

export default class Item extends Component {

  clickOccurred = false

  onMount = (element) => {
    this.audioNode = element
  }

  componentDidUpdate() {
    const {item, keyPressed, setIsPlaying, preventKeyPress} = this.props
    const {keyAssigned} = item
    if (!preventKeyPress) {
      if (keyAssigned && keyPressed && keyPressed === keyAssigned) {
        this.play()
        if (!item.isPlaying) {
          setIsPlaying(item, true)
        }
      }
      if (keyPressed === '' && item.isPlaying && !this.clickOccurred) {
        setIsPlaying(item, false)
      }
    }
  }

  mouseDown = () => {
    if (!this.props.preventKeyPress) {
      this.play()
      this.clickOccurred = true
      this.props.setIsPlaying(this.props.item, true)
    }
  }

  mouseUp = () => {
    if (!this.props.preventKeyPress) {
      this.clickOccurred = false
      this.props.setIsPlaying(this.props.item, false)
    }
  }

  play = () => {
    document.importNode(this.audioNode).play()
  }

  render() {
    const { 
      item, 
      editKeyBinding, 
      handleChange, 
      addKeyBinding, 
      removeKeyBinding,
      keyBindingsByLetters
    } = this.props
    const {
      name, 
      url, 
      keyAssigned, 
      keyEdittingValue, 
      isEditing, 
      isPlaying 
    } = item
    return (
      <div className="column is-3">
        <div className={isPlaying ? 'message is-primary' : 'message'}>
          <div className="message-body is-medium has-text-centered">
            <section className={isPlaying ? 'button button-card is-primary' : 'button button-card'} 
              onMouseDown={this.mouseDown} 
              onMouseUp={this.mouseUp}>
              <h2>{name.split('.')[0]}</h2>
              <audio preload="true" ref={this.onMount} src={url} />
              {keyAssigned &&<h2 className="is-size-3 has-text-weight-bold">{keyAssigned}</h2>}
            </section>
            <section className="card-content">
              {isEditing && 
                <span className="button is-info is-small" 
                  onClick={() => editKeyBinding(item)}>Cancel</span>}
              {!isEditing && keyAssigned && 
                <span className="button is-primary is-small" 
                  onClick={() => editKeyBinding(item)}>Edit Binding</span>}
              {!isEditing && !keyAssigned && 
                <span className="button is-info is-small" 
                  onClick={() => editKeyBinding(item)}>Add Binding</span>}
              {isEditing && 
                <ItemInput 
                  item={item} 
                  value={keyAssigned} 
                  inUse={keyBindingsByLetters.includes(keyEdittingValue)} 
                  handleChange={handleChange} 
                  addKeyBinding={addKeyBinding} 
                  keyAssigned={keyAssigned} 
                  removeKeyBinding={removeKeyBinding}/>}
            </section>
          </div>
        </div>
      </div>
    )
  }
}