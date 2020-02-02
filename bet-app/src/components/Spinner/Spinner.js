import React from 'react'
import spinner from './spinner.gif'

export default ({size}) => {
  if(!!size) {
    return (
      <div>
        <img 
          src={spinner} 
          style={{width: '25px', display: 'block', margin: 'auto', color: "white"}}
          alt="Loading..."
      />
      </div>
    )
  }

  return (
    <div>
      <img 
        src={spinner} 
        style={{width: '200px', display: 'block', margin: 'auto'}}
        alt="Loading..."
    />
    </div>
  )
}