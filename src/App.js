//shout out to Darwin Tech (https://www.youtube.com/watch?v=U2g--_TDYj4)
//and Mohan Raj for inspo with this component (https://www.section.io/engineering-education/speech-recognition-in-javascript/)
import './App.css';
import React, { useEffect, useState } from 'react'
import OpenAI from 'openai-api';
import {} from 'dotenv/config';
import Response from './Components/Response';
import Text from './Components/Text';
import Button from './Components/Button';

// import firebaseApp, {analytics} from './Firebase';

//OpenAI GPT-3
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const openai = new OpenAI(OPENAI_API_KEY);

//Speech Rec.
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
console.log(SpeechRecognition)
const recognition = new SpeechRecognition()
console.log(recognition)
recognition.continuous = true
recognition.interimResults = true
recognition.lang = 'en-US'


export default function App() {
  //state
  const [isListening, setIsListening ] = useState(false)
  const [text, setText ] = useState('')
  const [transcript, setTranscript ] = useState(null)
  const [completion, setCompletion ] = useState(null)

  //effects
  useEffect(()=>{
    handleListen(); console.log('handleListen()');
  }, [isListening])

  //TODO: move this async function to a UseEffect hook.
  async function sendPrompt() {
    const gptResponse = await openai.complete({
        engine: 'ada', //davinci-instruct-beta
        maxTokens: 64,
        prompt: text
    });
    setCompletion(gptResponse.data.choices[0].text)
    console.log(`gpt: ${gptResponse.data.choices[0].text}`)
  }

  //recognition
  recognition.onstart = () => console.log('onstart callback')
  //onresult resolves transcript value while listening - before onend  
  recognition.onresult = event => { 
    const transcript = Array.from(event.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('')
    setTranscript(transcript); console.log(transcript);
    recognition.onerror = event => console.log(event.error) 
  }

  //handlers
  const handleListen = () => {
    if(isListening){                                   
      recognition.start(); console.log('start listening event');
      recognition.onend = () => {                       
        console.log('onend callback')
        recognition.start(); console.log('restart listening');
      }
    }else {
      recognition.stop(); console.log('stop listening event'); 
      recognition.onend =()=> {console.log('onend callback') 
        setText(prevText => prevText +' '+ transcript)
        setTranscript('')
      }
    }
  }
  const handleTextChange = e => setText(e.target.value)

  return (
    <div className="App">
      <h1 className='mt-5 title'>Ask God to complete your sentence.</h1>
      <br/><br/>
      <div className='container'>
        <div className='box'>
          <Button onclick = {()=> setIsListening(prevState => !prevState)}
                  message = {!isListening ? 'Listen' : 'Stop'} 
                  type={'btn-primary'} />
          {isListening ? <div className='mb-5'><i>Listening</i></div> : <div className='mb-5'><i>Not Listening</i></div>}
        </div>
        <div style={{height: '100px'}}>
          {isListening ? <p>{transcript}</p> : null}
        </div>
        <Text text={text}
              handleTextChange={handleTextChange} />
        <Button onclick={sendPrompt}
                message={'Complete'} 
                type={'btn-warning'} />
        <Response completion={completion} />
        <Button onclick = {()=>setText(prev=>prev+' '+completion)}
                message = {'Add'} 
                type={'btn-success'} />
      </div>
    </div>
  )
}
