import React, { useState, useEffect } from 'react';
import ChildSimpleView from './ChildSimpleView';
import WalletConnect from './WalletConnect';

const Dashboard = ({ parentAddress }) => {
  const [children, setChildren] = useState([]);
  const [newChildAddress, setNewChildAddress] = useState('');
  const [selectedChild, setSelectedChild] = useState(null);
  const [userSession, setUserSession] = useState(null);

  // Load children from localStorage on component mount
  useEffect(() => {
    const savedChildren = localStorage.getItem('parentalPortalChildren');
    if (savedChildren) {
      setChildren(JSON.parse(savedChildren));
    }
  }, []);

  // Save children to localStorage whenever children state changes
  useEffect(() => {
    localStorage.setItem('parentalPortalChildren', JSON.stringify(children));
  }, [children]);

  const addChild = () => {
    if (newChildAddress.trim() && !children.includes(newChildAddress.trim())) {
      setChildren([...children, newChildAddress.trim()]);
      setNewChildAddress('');
    }
  };

  const removeChild = (address) => {
    setChildren(children.filter(child => child !== address));
    if (selectedChild === address) {
      setSelectedChild(null);
    }
  };

  const viewChild = (address) => {
    setSelectedChild(address);
  };

  const goBackToDashboard = () => {
    setSelectedChild(null);
  };

  if (selectedChild) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Child Wallet Details</h1>
          <button onClick={goBackToDashboard} className="back-button">
            ← Back to Dashboard
          </button>
        </header>
        <main>
          <ChildSimpleView parentAddress={parentAddress} childAddress={selectedChild} />
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Parental Portal Dashboard</h1>
        <div className="header-controls">
          <span>Connected: {parentAddress}</span>
          <WalletConnect onSession={setUserSession} onAddress={() => {}} />
        </div>
      </header>
      
      <main>
        <div className="dashboard-container">
          <div className="add-child-section">
            <h2>Add New Child</h2>
            <div className="add-child-form">
              <input
                type="text"
                placeholder="Child's Stacks Address"
                value={newChildAddress}
                onChange={(e) => setNewChildAddress(e.target.value)}
                style={{ width: '300px', marginRight: '10px' }}
              />
              <button onClick={addChild} disabled={!newChildAddress.trim()}>
                Add Child
              </button>
            </div>
          </div>

          <div className="children-list-section">
            <h2>Your Children ({children.length})</h2>
            {children.length === 0 ? (
              <p>No children added yet. Add a child's wallet address to start monitoring.</p>
            ) : (
              <div className="children-grid">
                {children.map((childAddress, index) => (
                  <div key={index} className="child-card">
                    <div className="child-info">
                      <strong>Child {index + 1}</strong>
                      <p className="child-address">{childAddress}</p>
                    </div>
                    <div className="child-actions">
                      <button 
                        onClick={() => viewChild(childAddress)}
                        className="view-button"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => removeChild(childAddress)}
                        className="remove-button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 