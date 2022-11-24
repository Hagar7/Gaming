import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.scss';
import AllGamingProvider from './Context/GamingContext';
import AuthenContextProvider from './Context/AuthContexet';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
   <AuthenContextProvider>
     <AllGamingProvider>
      
         <App />
    
     </AllGamingProvider>
   </AuthenContextProvider>
);

reportWebVitals();
