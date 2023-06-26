import ReactDOM from 'react-dom/client'
import { initializeApp } from 'firebase/app';
import App from './App.tsx'
import './index.css'


const firebaseConfig = {

    apiKey: "AIzaSyBFDZeBpfqQrkD4KRDS5jvljkgKWJciIhc",
    authDomain: "langchainai-8e76a.firebaseapp.com",
    projectId: "langchainai-8e76a",
    storageBucket: "langchainai-8e76a.appspot.com",
    messagingSenderId: "550169279166",
    appId: "1:550169279166:web:97646610c6fa71b463bcef"
  };

  const app = initializeApp(firebaseConfig);
  

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
    <App />
//   </React.StrictMode>,
)
