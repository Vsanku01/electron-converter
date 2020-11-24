import React from 'react';
import './styles.css';
import Home from './components/Home';

const App = () => {
  return (
    <div className='h-screen bg-purple-500'>
      <Home />
    </div>
  );
};

export default App;

/* 
    <div className='h-screen bg-purple-500 '>
      <Home />
    </div>



      <h1>I am App Component</h1>
      <h2>Welcome</h2>
      <button
        onClick={() => {
          electron.notificationApi.sendNotification('Hello world');
        }}
        className='bg-blue-700'
      >
        Notify
      </button>
*/
