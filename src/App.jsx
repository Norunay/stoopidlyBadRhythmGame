import React, { createElement, useEffect, useState } from 'react'
import UI from './UI';

export default function App() {  

  // ? HITEFFECT HITEFFECT HITEFFECT HITEFFECT HITEFFECT HITEFFECT HITEFFECT HITEFFECT HITEFFECT HITEFFECT HITEFFECT 

    let click = new Audio('./sounds/cut-audio.wav');
    click.preload = 'auto';
  
  // * HITEFFECT HITEFFECT HITEFFECT HITEFFECT HITEFFECT HITEFFECT HITEFFECT HITEFFECT HITEFFECT HITEFFECT HITEFFECT 
  // ? PLAYERINPUT PLAYERINPUT PLAYERINPUT PLAYERINPUT PLAYERINPUT PLAYERINPUT PLAYERINPUT PLAYERINPUT PLAYERINPUT PLAYERINPUT 

    let [compose, setCompose] = useState({});

  // * PLAYERINPUT PLAYERINPUT PLAYERINPUT PLAYERINPUT PLAYERINPUT PLAYERINPUT PLAYERINPUT PLAYERINPUT PLAYERINPUT PLAYERINPUT 
  // ? BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT  BEAT BEAT BEAT BEAT

    // !------------------------------------------------------------------------------------------------------------------------
      const a = 'a';
      const t = 't';
      const l = 'l';
      const b = 'b';
      const g = ' ';
      const LVL1 = [
        a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,
      ];
      const LVL1DELAY = [
        1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,
      ]

      // !-------------------------------------------------------------------------------------------------------------------------
      let [errrors, setErrors] = useState(0);
      let [perfects,setPerfects] = useState(0);
      let [index, setIndex] = useState(0)

    let calibration = 800;
    let bpm = 60;
    let beatPerSec = bpm/60;
    let [lastBeat,setLastBeat] = useState(0);
    let [nextBeat,setNextBeat] = useState(beatPerSec*LVL1DELAY[index]);
    let [position,setPosition] = useState([-3]);
    let [activeBeat,setActiveBeat] = useState(-1);
    let [activeBeatStart,setActiveBeatStart] = useState(0);
    let [activeBeatEnd,setActiveBeatEnd] = useState(0);
    let [tr, settr] = useState(false);
    let [aLeft,setALeft] = useState([0]);

    let music = '';

    // * BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT BEAT
    // ? MUSIC PLAYER MUSIC PLAYER MUSIC PLAYER MUSIC PLAYER MUSIC PLAYER MUSIC PLAYER MUSIC PLAYER MUSIC PLAYER MUSIC PLAYER MUSIC PLAYER

    function startMusic(){
      music = setInterval(() => {
        setPosition(p=>[p[0]+beatPerSec/10]);
      }, beatPerSec*100);
    }
    function stopMusic(){
      clearInterval(music);
    }
    function loger(){
      console.log(position[0]);
    }
    // * MUSIC PLAYER MUSIC PLAYER MUSIC PLAYER MUSIC PLAYER MUSIC PLAYER MUSIC PLAYER MUSIC PLAYER MUSIC PLAYER MUSIC PLAYER MUSIC PLAYER
    // ? POSITION POSITION POSITION POSITION POSITION POSITION POSITION POSITION POSITION POSITION POSITION POSITION POSITION POSITION

      useEffect(_ => {
        if(position >= activeBeatStart && position < activeBeatEnd){
          setALeft([0]);
          setActiveBeat(a => a=nextBeat);
        }else{
          setActiveBeat(-1);
          settr(false);
          setALeft([(position-lastBeat)*(90/(nextBeat-lastBeat))]);

        }
        if(position[0] >= nextBeat){
          setLastBeat(nextBeat);
          setActiveBeatStart(nextBeat - calibration/1000);
          setActiveBeatEnd(nextBeat + calibration/1000);        
          setNextBeat(n => n+=beatPerSec*LVL1DELAY[index]);
          setIndex(i=>i+=1);
          if(LVL1[index] == compose.kiy && lastBeat == compose.bit){
            setPerfects(true);
            setErrors(false);
          }else {
            setErrors(true);
            setPerfects(false);
          }
        }
        console.log(activeBeat,activeBeatStart,position[0],activeBeatEnd,nextBeat,lastBeat, 'line%:', aLeft[0]);
      }, position);

      useEffect(_=>{
        let inpChek = e => {
          setCompose(c=> ({...c, kiy: e.key, bit: activeBeat}))
          console.log(compose);
        }
        document.addEventListener('keypress', inpChek)
        
        return _=>{
          document.removeEventListener('keypress',inpChek);
        }
      },[compose])

    // * POSITION POSITION POSITION POSITION POSITION POSITION POSITION POSITION POSITION POSITION POSITION POSITION POSITION POSITION




    /**
     * $ @HERE blat
     */


  // ! -------------------------------------------------------------------------------------------------------------------------------------
    
    return (
    <div className='w-full h-screen bg-gray-400'>
        <div className="top top-box side-box flex items-center justify-center"> press - T

        </div>

        <div className="right side-box side-box flex items-center justify-center"> press - L

        </div>

        <div onClick={startMusic} className={(perfects && !errrors ? "centre bg-green-500" : !perfects && errrors ? "centre bg-red-600" : "centre bg-purple-600")}></div>

        <div className="left side-box flex items-center justify-center" > press - A
          {aLeft.map(el=>{
            if(el != 0){
              return (
                <div key={1}  className='stickA h-full' style={{left: el+'%'}}></div>
              )
            }
          })} 
        </div>

        <div className="bottom top-box side-box flex items-center justify-center"> press - B
          
        </div>
    </div>
  )

  // ! -------------------------------------------------------------------------------------------------------------------------------------

}