import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//Firebase
import { initializeApp } from "firebase/app";
// import { getApps } from 'firebase/app';

//Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCWDdJs1gHa5TlwTW9_Wrn7jS7uGVv9JFk",
  authDomain: "stories-4d1b9.firebaseapp.com",
  projectId: "stories-4d1b9",
  storageBucket: "stories-4d1b9.appspot.com",
  messagingSenderId: "631521452572",
  appId: "1:631521452572:web:e6b06d13d89a057178b5d9"
};


// Initialize Firebase
initializeApp(firebaseConfig);

// const firebaseApp = getApps()[0];

//render React App
ReactDOM.render(
  <React.StrictMode>
      {/* <code>
        <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
      </code> */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
