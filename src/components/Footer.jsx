import React from 'react'

export default function Footer({image, title, day, time}) {


  return (
    <>
    <div>
    <img src={image} alt={title} />
    </div>
    <div>
        <p>{title}</p>
        <p>{day} - {time}</p>
    </div>
    </>
  )
}

