# Parental Portal - Blockchain Wallet Monitoring System

# 🧿 Parental View Portal

Parental View Portal is a blockchain-based decentralized application (dApp) designed to let parents monitor child activity on the blockchain through read-only smart contract access — without having the ability to modify anything.

## 🛠 Features

- 🔐 Read-only access to child smart contract activity
- 📊 Simple UI for monitoring and selecting children accounts
- ⚙️ Integrated with deployed Clarity smart contract
- 🧾 Privacy-focused: no write permissions or private data stored

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or above recommended)
- [npm](https://www.npmjs.com/)

### Run the App

1. Clone the repository and navigate to the frontend directory:

   ```bash
   git clone <your-repo-url>
   cd parental-view-frontend

# Installation & Setup Guide

## 🚀 Getting Started

### Install dependencies (only once):
```bash
npm install
```

### Start the development server:
```bash
npm start
```

The app will automatically open in your default browser at:
```arduino
http://localhost:3000
```

## 📄 Smart Contract

The Clarity smart contract is already deployed on the Stacks blockchain at the following address:

```
ST1RT23XAS4TWJJ2GEXDT7C7VBMKXC5PN59RGWCH0.portal
```

## 🔧 Configuration

Make sure your `src/utils/contractCalls.js` file has the correct contract address:

```javascript
const CONTRACT_ADDRESS = 'ST1RT23XAS4TWJJ2GEXDT7C7VBMKXC5PN59RGWCH0';
const CONTRACT_NAME = 'portal';
```

## 📱 Usage

1. **Connect your Stacks wallet** (Hiro Wallet recommended)
2. **Switch to testnet** in your wallet settings
3. **Get testnet STX** from the [faucet](https://explorer.stacks.co/sandbox/faucet) if needed
4. **Register child wallets** and start monitoring!

## 🔍 Troubleshooting

If you encounter any issues:
- Ensure you're connected to **testnet**
- Check you have **testnet STX** for transaction fees
- Verify the **contract address** is correctly configured
- Make sure your **wallet is connected**

Happy monitoring! 🎉


Preview
<img width="1914" height="915" alt="{2E54387D-27D4-4E99-9994-628CAF4B577D}" src="https://github.com/user-attachments/assets/81a011ba-b02e-4748-be47-f6320011dc3d" />
<img width="1920" height="910" alt="{07F46330-73C6-4389-9574-576C06466887}" src="https://github.com/user-attachments/assets/8e4520af-e68d-4772-8d60-ad8f604c9c2a" />
<img width="1059" height="382" alt="{D9365E42-F5AC-4809-BD3F-E13F67840B34}" src="https://github.com/user-attachments/assets/83a07476-c6c5-4ecd-9418-b358de7f91a2" />
<img width="1918" height="873" alt="{479F8CB6-056A-45AA-A158-4EC495932C2F}" src="https://github.com/user-attachments/assets/3d4c0915-4e56-462f-afff-7b9d89b4ae13" />
<img width="1056" height="624" alt="{B4BFC824-6C91-4AE8-B784-72875626F399}" src="https://github.com/user-attachments/assets/9d6197e3-05c1-432d-a7f6-98faa25ae144" />





## Project Description

The Parental Portal is a innovative blockchain-based smart contract built on the Stacks blockchain using Clarity language. This system enables parents to monitor and track their children's cryptocurrency wallet activities in a transparent, secure, and decentralized manner. The contract provides a comprehensive framework for parental oversight of digital asset management, ensuring responsible financial education and safety for young crypto users.

The system allows parents to register their children's wallet addresses and log various transaction activities, creating an immutable record of financial interactions. This promotes transparency, accountability, and helps parents guide their children in developing healthy digital financial habits.

## Project Vision

Our vision is to bridge the gap between traditional parental guidance and modern digital finance by creating a trustless, blockchain-based monitoring system that:

- **Promotes Financial Literacy**: Help children learn about cryptocurrency and blockchain technology under parental guidance
- **Ensures Safety**: Provide parents with the tools to monitor and protect their children from potential crypto-related risks
- **Builds Trust**: Create transparency between parents and children regarding digital asset management
- **Encourages Responsibility**: Foster responsible financial behavior in the next generation of crypto users
- **Maintains Privacy**: Utilize blockchain's inherent privacy features while providing necessary oversight

We envision a future where blockchain technology serves as a foundation for safe, educational, and responsible introduction of children to the world of digital finance.

## Future Scope

### Phase 1 - Enhanced Monitoring Features
- **Spending Limits**: Implement smart contract-based spending limits with automatic restrictions
- **Alert System**: Real-time notifications for large transactions or suspicious activities
- **Multi-Parent Support**: Allow multiple guardians to monitor the same child's wallet
- **Activity Categories**: Categorize transactions (gaming, education, savings, etc.)

### Phase 2 - Advanced Analytics
- **Spending Analytics Dashboard**: Visual representation of spending patterns and trends
- **Risk Assessment**: AI-powered risk analysis for transaction patterns
- **Educational Content Integration**: Built-in financial literacy resources and quizzes
- **Reward System**: Token-based rewards for achieving financial goals

### Phase 3 - Ecosystem Expansion
- **Cross-Chain Compatibility**: Support for multiple blockchain networks (Bitcoin, Ethereum, etc.)
- **DeFi Integration**: Monitor DeFi protocol interactions and yield farming activities
- **NFT Tracking**: Track NFT purchases, trades, and collection management
- **Social Features**: Connect with other families for financial education communities

### Phase 4 - Advanced Security & Compliance
- **KYC Integration**: Age verification and identity management systems
- **Regulatory Compliance**: Ensure compliance with financial regulations for minors
- **Insurance Integration**: Wallet insurance options for added security
- **Recovery Mechanisms**: Advanced wallet recovery options for lost access

### Long-term Vision
- **Global Adoption**: Partnership with educational institutions and financial literacy programs
- **Mobile Application**: User-friendly mobile app for easier monitoring and management
- **API Development**: Allow third-party applications to integrate with the monitoring system
- **Government Partnerships**: Collaborate with regulatory bodies for standardized crypto education

## Key Features

### Current Implementation
- **Child Wallet Registration**: Parents can register their children's wallet addresses
- **Activity Logging**: Comprehensive transaction activity tracking
- **Real-time Balance Monitoring**: Check STX balance of registered child wallets
- **Immutable Records**: All activities are permanently recorded on the blockchain
- **Access Control**: Only registered parents can monitor their registered children

### Smart Contract Functions

#### Write Functions
1. **register-child-wallet**: Register a child's wallet address for monitoring
2. **log-child-activity**: Record and track child's transaction activities

#### Read-Only Functions
- **get-child-registration**: Retrieve registration information
- **get-child-activity**: Access specific activity records
- **get-child-stx-balance**: Check current STX balance
- **get-child-activity-count**: Get total number of recorded activities
- **is-child-registered**: Verify registration status

## Contract Address

**Testnet Contract Address**: `ST1RT23XAS4TWJJ2GEXDT7C7VBMKXC5PN59RGWCH0.portal`

<img width="1919" height="923" alt="image" src="https://github.com/user-attachments/assets/f898493e-5c10-4c19-bea0-d64c150ef2c4" />






## Getting Started

### Prerequisites
- Stacks wallet (Hiro Wallet, Xverse, etc.)
- Basic understanding of blockchain and cryptocurrency concepts
- STX tokens for transaction fees

### Installation & Usage

1. **Connect Your Wallet**: Connect your Stacks wallet to interact with the contract
2. **Register Child Wallet**: Use the `register-child-wallet` function with your child's wallet address
3. **Log Activities**: Record transactions using the `log-child-activity` function
4. **Monitor**: Use read-only functions to track activities and balances

### Example Usage

```clarity
;; Register a child's wallet
(contract-call? .parental-portal register-child-wallet 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRR6F44)

;; Log a transaction activity
(contract-call? .parental-portal log-child-activity 
    'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRR6F44 
    "STX Transfer" 
    u1000000 
    (some 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE) 
    (some "Allowance payment"))
```

## Security Considerations

- Only parents can register and monitor their children's wallets
- All data is stored immutably on the blockchain
- Access control mechanisms prevent unauthorized monitoring
- Smart contract code is open-source and auditable

## Contributing

We welcome contributions from the community! Please feel free to submit issues, feature requests, or pull requests to help improve the Parental Portal system.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Disclaimer**: This smart contract is designed for educational and monitoring purposes. Always ensure compliance with local regulations regarding cryptocurrency use by minors. The developers are not responsible for any misuse of the system.
