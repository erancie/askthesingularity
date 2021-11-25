import React, { useEffect, useState } from 'react'
import OpenAI from 'openai-api';
import {} from 'dotenv/config';
import Response from './Response';

export default function Prompt(props) {

  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const openai = new OpenAI(OPENAI_API_KEY);
  
  let prompt = props.speechString

  useEffect(()=> {
    handlePromptChange()
  }, [prompt])

  const handlePromptChange = () => {
    setPromptState({prompt: prompt})
  }

  const [promptState, setPromptState] = useState({
    prompt: '',
    tokens: 12,
    completion: '',
  })

  const handleChange = (event)=>{
    const { name, value } = event.target
    setPromptState((preValue)=>{  
      return {
        ...preValue,
        [name]: value
      }
    })
    console.log(name)
    console.log(value)
  }

  async function sendPrompt() {
    const gptResponse = await openai.complete({
        engine: 'davinci',
        maxTokens: 64,
        prompt: promptState.prompt
    });
    setPromptState({completion: gptResponse.data.choices[0].text})
  };

  return (
    <div className='container'>
      <textarea className='in' type="text" name='prompt' onChange={handleChange} value={promptState.prompt}></textarea>
      <button className='btn btn-success btn-lg p-5 m-5' type='button' onClick={sendPrompt} >Complete</button>
      <div></div>
      <Response completion={promptState.completion} />
    </div>
  )
}