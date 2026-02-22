# Blockchain Integration

This directory contains all blockchain-related code including smart contract interactions, multi-chain support, and transaction management.

## Files

- **index.js**: Core blockchain integration module with multi-chain support
- **etherscan-integration.js**: Etherscan API integration for transaction verification
- **smart-accounts.js**: MetaMask Smart Accounts Kit integration for account abstraction

## Usage

### Initialize Blockchain Connection

```javascript
const { initializeBlockchain, getNetworkInfo } = require('./index.js');

// Initialize connection to Ethereum mainnet
const result = await initializeBlockchain('ethereum');
console.log(result);

// Get network information
const networkInfo = getNetworkInfo('polygon');
console.log(networkInfo);
```

### Query Etherscan API

```javascript
const { queryEtherscanApi } = require('./etherscan-integration.js');

// Query Etherscan API for chain information
const result = await queryEtherscanApi('eth');
console.log(result.body);
```

### Smart Account Management

```javascript
const { createSmartAccount, executeTransaction } = require('./smart-accounts.js');

// Create a new smart account
const account = await createSmartAccount('0xYourOwnerAddress');

// Execute a transaction
const tx = await executeTransaction(account.smartAccountAddress, {
  to: '0xRecipientAddress',
  value: '1000000000000000000', // 1 ETH in wei
  data: '0x'
});
```

## Supported Chains

- Ethereum Mainnet (chainId: 1)
- Sepolia Testnet (chainId: 11155111)
- Polygon Mainnet (chainId: 137)

## Features

- ✅ Multi-chain support
- ✅ Etherscan API integration
- ✅ Smart account creation and management
- ✅ Transaction verification
- 🔄 Batch transactions (coming soon)
- 🔄 Gasless transactions (coming soon)

## Dependencies

- Node.js built-in `https` module
- `@metamask/smart-accounts-kit` (imported at runtime)

## Configuration

Set environment variables for API keys:

```bash
ETHERSCAN_API_KEY=your_api_key_here
INFURA_PROJECT_ID=your_infura_project_id
```
