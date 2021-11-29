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
  //state
  const [isListening, setIsListening ] = useState(false)
  const [text, setText ] = useState(null)

  //recognition
  recognition.onstart = () => console.log('onstart')

  recognition.onresult = event => {
    const transcript = Array.from(event.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('')
    setText(transcript); console.log(transcript);
    recognition.onerror = event => console.log(event.error) 
  }
  //effects
  useEffect(()=>{
    handleListen(); console.log('handleListen()');
  }, [isListening])
    //effect for onComplete?
  

  //handlers
  const handleListen = () => {
    if(isListening){                                   
      recognition.start(); console.log('start');
      recognition.onend = () => {                       
        console.log('onend')
        recognition.start(); console.log('restart');
      }
    }else {
      recognition.stop(); console.log('stop');
      recognition.onend =()=> console.log('onend') 
    }
  }

  //handle onComplete - include completion string to make new text string

  return (
    <div className='container'>

      <div className='box'>
        <button className='btn btn-primary btn-lg p-5 m-5' 
                onClick={()=> setIsListening(prevState => !prevState)}>
          {!isListening ? 'Listen' : 'Stop'}
        </button>

        {isListening ? <div className='mb-5'><i>Listening</i></div> : <div className='mb-5'><i>Not Listening</i></div>}
      </div>

      {/* //add onComplete prop */}
      <Prompt speechString={text} />

    </div>
  )
}