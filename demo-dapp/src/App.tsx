import React, { useEffect, useState } from 'react';
import logo from './logo.webp';
import './App.css';
import { getConnectedAddress } from './accounts';
import { Connected } from './Connected';
import { Messages } from './Messages';

function App() {

  const [connectedAddress, setConnectedAddress] = useState<string>()

  useEffect(() => {
    getConnectedAddress().then(setConnectedAddress)
  }, [connectedAddress])


  console.log('connectedAddress', connectedAddress)
  return (
    <div className="App">
      <menu>
        <img src={logo} height="100%" />
      </menu>
      <header className="App-header">

        <h2>
          Saving Accounts
        </h2>
        {connectedAddress ? <Connected address={connectedAddress} /> : (<div>Disconnected</div>)}
      </header>
      <Messages></Messages>

    </div>
  );
}

export default App;
