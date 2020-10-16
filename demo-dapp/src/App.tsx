import React, { useEffect, useReducer, useState } from 'react';
import logo from './logo.webp';
import './App.css';
import { getConnectedAddress } from './accounts';
import { Connected } from './Connected';
import { ActionTypes, Messages, messaging } from './Messages';

function App() {

  const [connectedAddress, setConnectedAddress] = useState<string>()
  const [messagesState, messagesDispatch] = useReducer(messaging, {
    messages: []
  })

  useEffect(() => {
    getConnectedAddress().then(setConnectedAddress)
    messagesDispatch({
      type: ActionTypes.ADD_MESSAGE, message: {
        body: 'Testing',
        timestamp: Date.now(),
        type: "success"
      }
    })
  }, [connectedAddress])

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
      <Messages messages={messagesState.messages}></Messages>

    </div>
  );
}

export default App;
