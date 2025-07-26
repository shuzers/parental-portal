import React, { useState, useEffect } from 'react';
import { fetchCallReadOnlyFunction, standardPrincipalCV } from '@stacks/transactions';

const CONTRACT_ADDRESS = 'ST1RT23XAS4TWJJ2GEXDT7C7VBMKXC5PN59RGWCH0';
const CONTRACT_NAME = 'portal';
const STACKS_API_BASE = 'https://api.testnet.hiro.so';

const ChildSimpleView = ({ parentAddress, childAddress }) => {
  const [balance, setBalance] = useState(null);
  const [txs, setTxs] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatSTX = (microSTX) => {
    return (Number(microSTX) / 1e6).toFixed(6);
  };

  const getTransactionType = (tx) => {
    if (tx.tx_type === 'token_transfer') return 'STX Transfer';
    if (tx.tx_type === 'contract_call') return 'Contract Call';
    if (tx.tx_type === 'smart_contract') return 'Contract Deploy';
    return tx.tx_type;
  };

  const getTransactionAmount = (tx) => {
    if (tx.tx_type === 'token_transfer' && tx.token_transfer) {
      const amount = tx.token_transfer.amount;
      const symbol = tx.token_transfer.token_metadata?.symbol || 'STX';
      return `${formatSTX(amount)} ${symbol}`;
    }
    return 'N/A';
  };

  const getTransactionDirection = (tx) => {
    if (tx.tx_type === 'token_transfer' && tx.token_transfer) {
      return tx.token_transfer.recipient_address === childAddress ? 'Received' : 'Sent';
    }
    return 'N/A';
  };

  const getTransactionStatus = (tx) => {
    return tx.tx_status === 'success' ? 'Success' : 
           tx.tx_status === 'pending' ? 'Pending' : 'Failed';
  };

  const calculateAnalytics = (transactions) => {
    const now = Date.now();
    const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = now - (30 * 24 * 60 * 60 * 1000);

    let weeklyReceived = 0;
    let weeklySent = 0;
    let monthlyReceived = 0;
    let monthlySent = 0;
    let weeklyCount = 0;
    let monthlyCount = 0;

    transactions.forEach(tx => {
      const txTime = tx.burn_block_time * 1000;
      
      if (tx.tx_type === 'token_transfer' && tx.token_transfer) {
        const amount = Number(tx.token_transfer.amount) / 1e6;
        const isReceived = tx.token_transfer.recipient_address === childAddress;

        if (txTime >= oneWeekAgo) {
          weeklyCount++;
          if (isReceived) weeklyReceived += amount;
          else weeklySent += amount;
        }
        if (txTime >= oneMonthAgo) {
          monthlyCount++;
          if (isReceived) monthlyReceived += amount;
          else monthlySent += amount;
        }
      }
    });

    return {
      weekly: { received: weeklyReceived, sent: weeklySent, count: weeklyCount },
      monthly: { received: monthlyReceived, sent: monthlySent, count: monthlyCount }
    };
  };

  const fetchBalanceAndTxs = async () => {
    if (!childAddress) return;
    
    setLoading(true);
    setError('');
    setBalance(null);
    setTxs([]);
    setAnalytics(null);
    try {
      // Fetch balance from contract read-only function
      const result = await fetchCallReadOnlyFunction({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'get-child-stx-balance',
        functionArgs: [standardPrincipalCV(childAddress)],
        network: 'testnet',
        senderAddress: parentAddress,
      });
      setBalance(Number(result.value.value) / 1e6);

      // Fetch recent transactions from Hiro API
      const resp = await fetch(`${STACKS_API_BASE}/extended/v1/address/${childAddress}/transactions?limit=20`);
      const data = await resp.json();
      const transactions = data.results || [];
      setTxs(transactions);
      setAnalytics(calculateAnalytics(transactions));
    } catch (err) {
      setError('Error fetching data: ' + err.message);
    }
    setLoading(false);
  };

  // Auto-fetch data when childAddress changes
  useEffect(() => {
    if (childAddress) {
      fetchBalanceAndTxs();
    }
  }, [childAddress]);

  if (loading) {
    return (
      <div className="section">
        <h2>Loading {childAddress}...</h2>
        <p>Please wait while we fetch the wallet data.</p>
      </div>
    );
  }

  return (
    <div className="section">
      <h2>Wallet: {childAddress}</h2>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      
      {balance !== null && (
        <div style={{ marginTop: 20, padding: 15, backgroundColor: '#f8f9fa', borderRadius: 8 }}>
          <h3>Current Balance</h3>
          <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#28a745' }}>
            {balance} STX
          </div>
        </div>
      )}

      {analytics && (
        <div style={{ marginTop: 20, padding: 15, backgroundColor: '#e9ecef', borderRadius: 8 }}>
          <h3>Activity Analytics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <h4>Last 7 Days</h4>
              <p>Received: <span style={{ color: '#28a745' }}>{analytics.weekly.received.toFixed(6)} STX</span></p>
              <p>Sent: <span style={{ color: '#dc3545' }}>{analytics.weekly.sent.toFixed(6)} STX</span></p>
              <p>Transactions: {analytics.weekly.count}</p>
            </div>
            <div>
              <h4>Last 30 Days</h4>
              <p>Received: <span style={{ color: '#28a745' }}>{analytics.monthly.received.toFixed(6)} STX</span></p>
              <p>Sent: <span style={{ color: '#dc3545' }}>{analytics.monthly.sent.toFixed(6)} STX</span></p>
              <p>Transactions: {analytics.monthly.count}</p>
            </div>
          </div>
        </div>
      )}

      {txs.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Recent Transactions</h3>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {txs.map(tx => (
              <div key={tx.tx_id} style={{ 
                border: '1px solid #ddd', 
                margin: '10px 0', 
                padding: 15, 
                borderRadius: 8,
                backgroundColor: '#fff'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <a href={`https://explorer.hiro.so/txid/${tx.tx_id}?chain=testnet`} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ fontWeight: 'bold', color: '#007bff' }}>
                    {tx.tx_id.slice(0, 10)}...{tx.tx_id.slice(-6)}
                  </a>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: 4, 
                    fontSize: '0.8em',
                    backgroundColor: getTransactionStatus(tx) === 'Success' ? '#d4edda' : 
                                   getTransactionStatus(tx) === 'Pending' ? '#fff3cd' : '#f8d7da',
                    color: getTransactionStatus(tx) === 'Success' ? '#155724' : 
                           getTransactionStatus(tx) === 'Pending' ? '#856404' : '#721c24'
                  }}>
                    {getTransactionStatus(tx)}
                  </span>
                </div>
                <div style={{ fontSize: '0.9em', color: '#666' }}>
                  <p><strong>Type:</strong> {getTransactionType(tx)}</p>
                  <p><strong>Direction:</strong> {getTransactionDirection(tx)}</p>
                  <p><strong>Amount:</strong> {getTransactionAmount(tx)}</p>
                  <p><strong>Date:</strong> {new Date(tx.burn_block_time * 1000).toLocaleString()}</p>
                  {tx.post_conditions && tx.post_conditions.length > 0 && (
                    <p><strong>Memo:</strong> {tx.post_conditions[0]?.condition_code || 'N/A'}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildSimpleView; 