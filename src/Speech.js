//shout out to Darwin Tech (https://www.youtube.com/watch?v=U2g--_TDYj4)
//and Mohan Raj for inspo with this component (https://www.section.io/engineering-education/speech-recognition-in-javascript/)
import React, { useEffect, useState } from 'react'
import OpenAI from 'openai-api';
import {} from 'dotenv/config';
import Response from './Response';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const openai = new OpenAI(OPENAI_API_KEY);

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
  const [text, setText ] = useState('')
  const [transcript, setTranscript ] = useState(null)
  const [completion, setCompletion ] = useState(null)

  //recognition
  recognition.onstart = () => console.log('onstart')

  recognition.onresult = event => { //resolves value first - before onend
    const transcript = Array.from(event.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('')
    setTranscript(transcript); console.log(transcript);
    recognition.onerror = event => console.log(event.error) 
  }
  //effects
  useEffect(()=>{
    handleListen(); console.log('handleListen()');
  }, [isListening])

  async function sendPrompt() {
    const gptResponse = await openai.complete({
        engine: 'ada', //davinci-instruct-beta
        maxTokens: 64,
        prompt: text
    });
    setCompletion(gptResponse.data.choices[0].text)
    console.log(`gpt: ${gptResponse.data.choices[0].text}`)
  }
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
      recognition.onend =()=> {console.log('onend') 
        setText(prevText => prevText +' '+ transcript)
        setTranscript('')
      }
    }
  }

  return (
    <div className='container'>

      <div className='box'>
        <button className='btn btn-primary btn-lg p-5 m-5' 
                onClick={()=> setIsListening(prevState => !prevState)}>
          {!isListening ? 'Listen' : 'Stop'}
        </button>

        {isListening ? <div className='mb-5'><i>Listening</i></div> : <div className='mb-5'><i>Not Listening</i></div>}
      </div>
      {/* <h3></h3> */}
      <div style={{height: '100px'}}>
        {isListening ? <p>{transcript}</p> : null}
      </div>

      <textarea className='in' 
                type="text" 
                name='text' 
                onChange={(e)=>setText(e.target.value)} 
                value={text}>
                {/* value={isListening ? transcript : text}> */}
      </textarea>

      <button className='btn btn-warning btn-lg p-5 m-5' 
              type='button' 
              onClick={sendPrompt} >
        Complete
      </button>
      
      <Response completion={completion} />

      <button className='btn btn-success btn-lg p-5 m-5' 
              type='button' 
              onClick={()=>setText(prev=>prev+' '+completion)} >
        Add
      </button>

    </div>
  )
}



  // const handleChange = (event)=>{ 
  //   setText(event.target.value)
  // }

  // const handleComplete = () => {
  //   setText(prevState => {
  //     return prevState +' '+ completion
  //   })
  // }