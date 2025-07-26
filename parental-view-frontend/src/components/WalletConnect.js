import React from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

const WalletConnect = ({ onSession, onAddress }) => {
  const handleConnect = () => {
    showConnect({
      appDetails: {
        name: 'Parental Portal',
        icon: window.location.origin + '/logo192.png',
      },
      userSession,
      onFinish: () => {
        const userData = userSession.loadUserData();
        onSession(userSession);
        onAddress(userData.profile.stxAddress.testnet || userData.profile.stxAddress.mainnet);
      },
    });
  };

  const handleDisconnect = () => {
    userSession.signUserOut();
    onSession(null);
    onAddress('');
  };

  const isSignedIn = userSession.isUserSignedIn();
  const userData = isSignedIn ? userSession.loadUserData() : null;

  return (
    <div>
      {isSignedIn ? (
        <>
          <p>Connected: {userData.profile.stxAddress.testnet || userData.profile.stxAddress.mainnet}</p>
          <button onClick={handleDisconnect}>Disconnect</button>
        </>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;