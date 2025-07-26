import React, { useState, useEffect } from 'react';
import WalletConnect from './components/WalletConnect';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [userSession, setUserSession] = useState(null);
  const [parentAddress, setParentAddress] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (userSession && parentAddress) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userSession, parentAddress]);

  if (isLoggedIn) {
    return <Dashboard parentAddress={parentAddress} />;
  }

  return (
    <div className="App">
      <div className="login-page">
        <div className="login-container">
        <h1>Parental Portal</h1>
          <p>Monitor your children's Stacks wallet activity</p>
          <WalletConnect onSession={setUserSession} onAddress={setParentAddress} />
        </div>
          </div>
    </div>
  );
}

export default App;