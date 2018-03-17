import React from 'react'

const ItemInput = ({ value, item, inUse, keyAssigned, handleChange, removeKeyBinding, addKeyBinding }) => {
  return (
    <div>
      <div className="section is-small">
        <input className="input is-small" type="text" maxLength="1" defaultValue={value} onChange={(e) => handleChange(item, e.target.value)}/>
      </div>
      {item.keyEdittingValue.length === 1 && !inUse ? 
        <button className="button is-primary is-small" 
          onClick={() => addKeyBinding(item, item.keyEdittingValue)}>Save</button> :
        <button className="button is-small is-disabled" disabled>Save</button>}

      {keyAssigned && <button className="button is-warning is-small" 
        onClick={() => removeKeyBinding(item)}>Unbind</button>}
    </div>
  )
}

export default ItemInput