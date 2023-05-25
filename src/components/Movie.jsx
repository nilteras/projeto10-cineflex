import React from 'react'

export default function Movie({image, description}){
  return (
    <div>
      <img src={image} alt={description} />     
    </div>
  )
}

