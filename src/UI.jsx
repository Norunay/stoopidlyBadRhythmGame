import React, { useEffect, useState } from 'react'

export default function UI() {
  let [left,setLeft] = useState([0]);
  function pos(){
    setInterval(() => {
        setLeft(i=>[i[0]+1])
    }, 10);
  }

  return (
    <div className='w-full h-screen bg-gray-400'>
        <button onClick={pos}>test</button>
        <div className="top top-box"></div>
        <div className="right side-box"></div>
        <div className="centre">centre</div>
        <div className="left side-box" > <div className="line bg-amber-500 border-10 h-full" style={{left: left[0]+'%', position: 'absolute'}}></div></div>
        <div className="bottom top-box"></div>
    </div>
  )
}