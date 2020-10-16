import React, { useContext, useEffect, useReducer, useState } from 'react';
import logo from './logo.webp';
import './App.css';
import { getConnectedAddress } from './accounts';
import { Connected } from './Connected';
import { ActionTypes, Messages, messaging, CurrentMessagingState, MessasingActionTypes, MessagingContext } from './Messages';
import { AsyncButton } from './AsyncButton';

function App() {

  const [connectedAddress, setConnectedAddress] = useState<string>()
  const [state, dispatch] = useReducer(messaging, CurrentMessagingState)

  console.log('messageReducer', state)


  useEffect(() => {
    getConnectedAddress().then(setConnectedAddress)

  }, [connectedAddress])

  return (
    <MessagingContext.Provider value={{ state: state, dispatcher: dispatch }}>
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
    </MessagingContext.Provider>
  );
}

export default App;
