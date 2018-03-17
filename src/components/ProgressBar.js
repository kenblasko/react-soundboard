import React from 'react'

const ProgressBar = ({ value }) => {
  return <progress className="progress is-primary" value={value} max="100">{value}%</progress>
}

export default ProgressBar

