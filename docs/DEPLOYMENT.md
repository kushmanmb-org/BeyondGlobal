# Kairos Blockchain Platform - Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the Kairos blockchain platform, including Ethereum smart contracts, frontend integration, and the complete application stack.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Smart Contract Deployment](#smart-contract-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Backend Configuration](#backend-configuration)
6. [Testing](#testing)
7. [Production Deployment](#production-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js**: v14.x or higher
- **npm** or **yarn**: Latest version
- **Git**: For version control
- **MetaMask**: Browser extension for wallet interaction
- **Hardhat** or **Truffle**: For smart contract deployment

### Optional Tools

- **Docker**: For containerized deployment
- **PM2**: For process management
- **Nginx**: For reverse proxy and load balancing

### Required Accounts

- **Ethereum Wallet**: With testnet ETH for deployment
- **Infura Account**: For Ethereum node access (optional)
- **Etherscan API Key**: For contract verification (optional)

---

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Kushmanmb/BeyondGlobal.git
cd BeyondGlobal
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```bash
# Blockchain Configuration
PRIVATE_KEY=your_wallet_private_key_here
INFURA_KEY=your_infura_project_id_here
ETHERSCAN_API_KEY=your_etherscan_api_key_here

# Network URLs
SEPOLIA_URL=https://sepolia.infura.io/v3/${INFURA_KEY}
MAINNET_URL=https://mainnet.infura.io/v3/${INFURA_KEY}
LOCALHOST_URL=http://localhost:8545

# Contract Configuration
CONTRACT_INITIAL_SUPPLY=1000000

# Application Configuration
NODE_ENV=development
PORT=3000
```

**⚠️ Security Note**: Never commit the `.env` file to version control!

---

## Smart Contract Deployment

### Step 1: Prepare Contract

The Kairos Token smart contract is located at:
```
contracts/KairosToken.sol
```

### Step 2: Install Hardhat (if not already installed)

```bash
npm install --save-dev hardhat @nomiclabs/hardhat-waffle @nomiclabs/hardhat-ethers ethers
```

### Step 3: Configure Hardhat

Create `hardhat.config.js`:

```javascript
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    localhost: {
      url: "http://localhost:8545"
    },
    sepolia: {
      url: process.env.SEPOLIA_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    mainnet: {
      url: process.env.MAINNET_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
```

### Step 4: Compile Contract

```bash
npx hardhat compile
```

### Step 5: Deploy Contract

#### Local Deployment (Testing)

```bash
# Start local Hardhat node
npx hardhat node

# In another terminal, deploy
node scripts/ethereum-deploy.js localhost
```

#### Testnet Deployment (Sepolia)

```bash
node scripts/ethereum-deploy.js sepolia
```

#### Mainnet Deployment (Production)

```bash
# ⚠️ Use with caution - costs real ETH
node scripts/ethereum-deploy.js mainnet
```

### Step 6: Verify Contract (Optional)

After deployment, verify on Etherscan:

```bash
npx hardhat verify --network sepolia <DEPLOYED_CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

### Step 7: Save Contract Information

Save the deployed contract address and ABI for frontend integration:

```json
{
  "contractAddress": "0x...",
  "network": "sepolia",
  "deploymentDate": "2026-02-22",
  "initialSupply": "1000000"
}
```

---

## Frontend Deployment

### Step 1: Configure Frontend

Update `frontend/config.js` with contract details:

```javascript
export const CONTRACT_CONFIG = {
  address: '0x...', // Your deployed contract address
  abi: [...], // Contract ABI from compilation
  network: {
    chainId: '0xaa36a7', // Sepolia: 0xaa36a7, Mainnet: 0x1
    chainName: 'Sepolia Test Network',
    rpcUrl: 'https://sepolia.infura.io/v3/...'
  }
};
```

### Step 2: Test MetaMask Integration

Open `frontend/metamask-integration.js` in a browser and test:

1. Connect to MetaMask
2. Check account balance
3. Initialize contract
4. Test read operations

### Step 3: Build Frontend (if applicable)

```bash
# If using a build system
npm run build

# Output will be in dist/ or build/ directory
```

### Step 4: Serve Frontend

#### Development

```bash
# Simple HTTP server
npx http-server frontend -p 8080

# Or use Python
python -m http.server 8080 --directory frontend
```

#### Production

Use a production web server like Nginx or Apache.

**Nginx Configuration Example:**

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/kairos/frontend;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Backend Configuration

### Step 1: Configure Blockchain Backend

The cosmic blockchain deployment is in:
```
cosmic_blockchain_deploy/
```

### Step 2: Run Deployment Script

#### Linux/Mac

```bash
cd cosmic_blockchain_deploy
chmod +x scripts/deploy_linux.sh
./scripts/deploy_linux.sh
```

#### Windows

```cmd
cd cosmic_blockchain_deploy
scripts\deploy_windows.bat
```

### Step 3: Verify Backend

```bash
# Test the blockchain backend
node cosmic_blockchain_deploy/cosmic_blockchain.js
```

### Step 4: Start Application Server

```bash
# Start the main application
npm start

# Or with PM2 for production
pm2 start index.js --name kairos-app
```

---

## Testing

### Unit Tests

```bash
# Run all tests
npm test

# Run specific test
node test.js
```

### Integration Tests

```bash
# Test Etherscan API integration
npm run query-etherscan

# Test contract deployment
node scripts/ethereum-deploy.js localhost
```

### Frontend Tests

1. Open browser developer console
2. Navigate to frontend
3. Test MetaMask connection
4. Test contract interactions
5. Verify transaction handling

### End-to-End Tests

```bash
# Start local blockchain
npx hardhat node

# Deploy contract
node scripts/ethereum-deploy.js localhost

# Start application
npm start

# Run E2E tests (if configured)
npm run test:e2e
```

---

## Production Deployment

### Step 1: Security Checklist

- [ ] Environment variables properly configured
- [ ] Private keys secured (use hardware wallet for mainnet)
- [ ] Smart contracts audited
- [ ] Rate limiting implemented
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Input validation in place
- [ ] Error handling implemented

### Step 2: Optimize Build

```bash
# Minify and optimize
npm run build -- --production

# Analyze bundle size
npm run analyze
```

### Step 3: Deploy to Server

#### Using Docker (Recommended)

```dockerfile
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t kairos-app .
docker run -p 3000:3000 --env-file .env kairos-app
```

#### Using PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start index.js --name kairos

# Configure auto-restart on system reboot
pm2 startup
pm2 save
```

### Step 4: Configure Monitoring

```bash
# Monitor with PM2
pm2 monit

# View logs
pm2 logs kairos

# Check status
pm2 status
```

### Step 5: Set Up Backup

```bash
# Backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf backup_${DATE}.tar.gz \
    contracts/ \
    frontend/ \
    scripts/ \
    cosmic_blockchain_deploy/ \
    .env.example
```

---

## Troubleshooting

### Common Issues

#### 1. Contract Deployment Fails

**Issue**: Transaction reverts or runs out of gas

**Solution**:
```bash
# Increase gas limit in deployment script
const tx = await contract.deploy({ gasLimit: 5000000 });

# Check wallet has sufficient funds
npx hardhat balance <YOUR_ADDRESS>
```

#### 2. MetaMask Connection Issues

**Issue**: MetaMask not detected or connection fails

**Solution**:
- Ensure MetaMask is installed and unlocked
- Check network matches deployment network
- Clear browser cache and reload
- Check console for specific errors

#### 3. Transaction Fails

**Issue**: "Insufficient funds" or "Nonce too low"

**Solution**:
```javascript
// Reset MetaMask account
// Settings > Advanced > Reset Account

// Or manually set nonce
const nonce = await provider.getTransactionCount(address);
```

#### 4. CORS Errors

**Issue**: Frontend can't connect to backend

**Solution**:
```javascript
// In your Express server
const cors = require('cors');
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

### Getting Help

- **Documentation**: See `/docs` directory
- **Issues**: Report on GitHub
- **Community**: Join Discord/Telegram
- **Email**: support@kairos-blockchain.io

---

## Maintenance

### Regular Tasks

1. **Daily**
   - Check application logs
   - Monitor gas prices
   - Verify system uptime

2. **Weekly**
   - Review transaction history
   - Update dependencies
   - Check security alerts

3. **Monthly**
   - Backup data
   - Review and optimize performance
   - Update documentation

### Upgrading

```bash
# Pull latest changes
git pull origin main

# Update dependencies
npm update

# Run migrations if needed
npm run migrate

# Restart application
pm2 restart kairos
```

---

## Additional Resources

- [Ethereum Development Documentation](https://ethereum.org/developers)
- [Hardhat Documentation](https://hardhat.org/getting-started/)
- [MetaMask Documentation](https://docs.metamask.io/)
- [SFML Integration Guide](./SFML_INTEGRATION.md)

---

## Support

For deployment assistance or technical support:

- **Email**: deploy@kairos-blockchain.io
- **GitHub Issues**: https://github.com/Kushmanmb/BeyondGlobal/issues
- **Documentation**: https://docs.kairos-blockchain.io

---

**Version**: 1.0.0  
**Last Updated**: February 22, 2026  
**Maintained by**: Kairos Development Team
