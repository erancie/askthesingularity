// import React, { useEffect, useState } from 'react'
// import OpenAI from 'openai-api';
// import {} from 'dotenv/config';
// import Response from './Response';

// export default function Prompt(props) {

//   const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
//   const openai = new OpenAI(OPENAI_API_KEY);
  
//   const [promptState, setPromptState] = useState({
//     prompt: props.speechString,
//     completion: '',
//   })
// //TODO: fix onType - typed additions to the text area must reflect in the parent's text

//             //   props.onType(promptState.prompt) 

//   useEffect(()=> { // if props from parent change - reset state
//     setPromptState({prompt: props.speechString})
//   }, [props.speechString]) 

//   // useEffect(()=> { //if state from child changes - send to parent (lifting state up?)
//   //   props.onType(promptState.prompt)
//   // }, [promptState.prompt]) 

//   //handle add click by sending completion back to parent
//   // const handleAdd =(completion)=>{
//   //   props.onComplete(completion)
//   // }
//   const handleAdd =()=>{
//     props.onComplete(promptState.completion) //why does this clear child state data??
//     // props.onComplete(promptState.prompt)
//   }

  useEffect(()=> { //if state from child changes - send to parent (lifting state up?)
    props.onType(promptState.prompt)
  }, [promptState.prompt]) 

  //handle add click by sending completion back to parent
  // const handleAdd =(completion)=>{
  //   props.onComplete(completion)
  // }
  const handleAdd =()=>{
    props.onComplete(promptState.completion) //why does this clear child state data??
  }

  const handleChange = (event)=>{
    const { name, value } = event.target
    setPromptState((preValue)=>{  
      return {
        ...preValue,
        [name]: value //overwrites any previous element with same property name
      }
    })
    console.log(name); console.log(value);
  }
  
  async function sendPrompt() {
    const gptResponse = await openai.complete({
        engine: 'ada', //davinci-instruct-beta
        maxTokens: 64,
        prompt: promptState.prompt
    });
    setPromptState({completion: gptResponse.data.choices[0].text})
  };

  return (
    <div className='container'>
      <textarea className='in' 
                type="text" 
                name='prompt' 
                onChange={handleChange} 
                value={promptState.prompt}>
      </textarea>

//       <button className='btn btn-warning btn-lg p-5 m-5' 
//               type='button' 
//               onClick={sendPrompt} >
//         Complete
//       </button>
      
//       <Response completion={promptState.completion} />

//       <button className='btn btn-success btn-lg p-5 m-5' 
//               type='button' 
//               onClick={handleAdd} >
//         Add
//       </button>
      
//     </div>
//   )
// }
