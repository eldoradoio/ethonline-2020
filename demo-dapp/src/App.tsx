import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getConnectedAddress } from './accounts';
import { Connected } from './Connected';

function App() {
  
  const [connectedAddress, setConnectedAddress] = useState<string>()

  useEffect(() => {
    getConnectedAddress().then(setConnectedAddress)
  }, [connectedAddress])


  console.log('connectedAddress', connectedAddress)
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          El Dorado Saving Accounts
        </h2>
        {connectedAddress ? <Connected address={connectedAddress} /> : (<div>Disconnected</div>)}
      </header>

    </div>
  );
}

export default App;
