import React, { useEffect, useState } from 'react'
import OpenAI from 'openai-api';
import {} from 'dotenv/config';
import Response from './Response';

export default function Prompt(props) {

  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const openai = new OpenAI(OPENAI_API_KEY);
  

  //TODO: TRY LIFTING THIS STATE UP  (Or redux?)
  const [promptState, setPromptState] = useState({
    prompt: props.speechString,
    completion: '',
  })

  useEffect(()=> { // if props from parent change - reset state
    setPromptState({prompt: props.speechString})
  }, [props.speechString]) 


  //typing changes to child state - send to parent 
  // useEffect(()=> { 
  //   props.onType(promptState.prompt)
  // }, [promptState.prompt]) 
  
  //^^^^^^^^^^^^^^^^^^^^
  //works or typing but makes parent prev state undefined on sendprompt
  //leave out and parent prev state in tact on sendprompt

  const handleAdd =()=>{
    props.onComplete(promptState.completion) 
  }//why does this clear child state data??

  const handleChange = (e) => {
    setPromptState({prompt: e.target.value})
  }
  // const handleChange = (event)=>{ 
  //   // props.onType(promptState.prompt);
  //   const { name, value } = event.target
  //   setPromptState((preValue)=>{  
  //     return {
  //       ...preValue,
  //       [name]: value
  //     }
  //   })
  //   console.log(name); console.log(value);
  // }

  async function sendPrompt() {
    const gptResponse = await openai.complete({
        engine: 'ada', //davinci-instruct-beta
        maxTokens: 64,
        prompt: promptState.prompt
    });
    setPromptState({completion: gptResponse.data.choices[0].text})
  }

  return (
    <div className='container'>
      <textarea className='in' 
                type="text" 
                name='prompt' 
                onChange={handleChange} 
                value={promptState.prompt}>
      </textarea>

      <button className='btn btn-warning btn-lg p-5 m-5' 
              type='button' 
              onClick={sendPrompt} >
        Complete
      </button>
      
      <Response completion={promptState.completion} />

      <button className='btn btn-success btn-lg p-5 m-5' 
              type='button' 
              onClick={handleAdd} >
        Add
      </button>
      
    </div>
  )
}
