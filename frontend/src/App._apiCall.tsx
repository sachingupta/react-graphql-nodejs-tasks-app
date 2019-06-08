import React, { useState } from 'react';
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
        <p>
          {fact}
        </p>
      </header>
    </div>
  );
}

export default App;
