//shout out to Darwin Tech (https://www.youtube.com/watch?v=U2g--_TDYj4)
//and Mohan Raj for inspo with this component (https://www.section.io/engineering-education/speech-recognition-in-javascript/)
import React, { useEffect, useState } from 'react'
import Prompt from './Prompt'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
console.log(SpeechRecognition)
const recognition = new SpeechRecognition()
console.log(recognition)
recognition.continuous = true
recognition.interimResults = true
recognition.lang = 'en-US'


export default function Speech() {
  const [isListening, setIsListening ] = useState(false)
  const [text, setText ] = useState(null)

  recognition.onstart = () => console.log('onstart')    //define what happens everytime recognition has started listening
  recognition.onresult = event => {                     //define what happens everytime recognition produces a result event
    const transcript = Array.from(event.results)        //build a transcript string
    .map(result => result[0])
    .map(result => result.transcript)
    .join('')
    setText(transcript); console.log(transcript);
    recognition.onerror = event => console.log(event.error) //log err
  }

  useEffect(()=>{
    handleListen(); console.log('handleListen()');
  }, [isListening])

  const handleListen = () => {
    if(isListening){                                    // IF listening then define another start within onend callback
      recognition.start(); console.log('start');
      recognition.onend = () => {                       // callback records instructions on what to do when 'end' event occurs
        console.log('onend')
        recognition.start(); console.log('restart');
      }
    }else {                                             // IF NOT listening define no restart onend
      recognition.stop(); console.log('stop');
      recognition.onend =()=> console.log('onend') 
    }
  }
  return (
    <div className='container'>
      <div className='box'>
        <button className='btn btn-primary btn-lg p-5 m-5' onClick={()=> setIsListening(prevState => !prevState)}>{!isListening ? 'Listen' : 'Stop'}</button>
        {isListening ? <div className='mb-5'><i>Listening</i></div> : <div className='mb-5'><i>Not Listening</i></div>}
      </div>
      <Prompt speechString={text} />

    </div>
  )
}

      // speech result logging
      // console.log(event.results)
      // console.log(event.results[0])
      // console.log(event.results[0].transcript)//undefined?


      // The onend property of the SpeechRecognition interface represents an event handler 
      // that will run when the speech recognition service has disconnected 
      // (when the 'end' event fires.)
