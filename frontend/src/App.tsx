import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';


const App: React.FC = () => {
  const [fact, setFact] = React.useState('');

  React.useEffect(() => {
    fetch('http://localhost:7071/api/funFacts')
    .then(raw => raw.json())
    .then(response => {
      setFact(response.text);
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {fact}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
