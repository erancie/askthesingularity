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

  useEffect(()=>{
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if(isListening){
      recognition.start()
      recognition.onend = () => {
        console.log('start - onend -- start')
        recognition.start()
      }
    }else {
      recognition.stop()
      recognition.onend = () => {
        console.log('stop - onend')
      }
    }
    recognition.onstart = () => {
      console.log('onstart')
    }
    recognition.onresult = event => {
      //build a transcript string
      const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('')
      // console.log(event.results)
      // console.log(event.results[0])
      // console.log(event.results[0].transcript)//undefined?
      console.log(transcript)
      //set text to transcript string
      setText(transcript)
      recognition.onerror = event => {
        console.log(event.error)
      }
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
