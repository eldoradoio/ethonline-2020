import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAccounts, getBalance } from './accounts';
import { BigNumber } from 'ethers';
import { Account } from './Account';

function App() {
  const [balance, setBalance] = useState<BigNumber>()
  const [accounts, setAccounts] = useState<string[]>()

  useEffect(() => {
    getBalance().then(setBalance)
    getAccounts().then(setAccounts)
  }, [])

  const accountItems = accounts?.map(x => {
    return (<Account key={x} token={x} ></Account>)
  })

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Savings Balance: {balance?.toString()}
        </p>
        {accountItems}
      </header>
    </div>
  );
}

export default App;
