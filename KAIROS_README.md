# 🌌 Kairos Blockchain Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![Ethereum](https://img.shields.io/badge/Ethereum-Smart%20Contracts-blue)](https://ethereum.org/)

**Kairos** is a comprehensive blockchain platform that integrates Ethereum smart contracts with MetaMask wallet connectivity, featuring a cosmic-themed deployment system and advanced visualization capabilities.

## 🚀 Features

- **Ethereum Smart Contracts**: ERC20-like token implementation (KairosToken)
- **MetaMask Integration**: Seamless Web3 wallet connectivity
- **Blockchain Deployment**: Multi-platform cosmic blockchain deployment system
- **Graphics Visualization**: SFML-powered blockchain visualization framework
- **API Integration**: Etherscan API integration for blockchain data
- **Cross-Platform**: Support for Linux, macOS, and Windows
- **Developer-Friendly**: Comprehensive documentation and deployment guides

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Smart Contracts](#smart-contracts)
- [Frontend](#frontend)
- [Deployment](#deployment)
- [Testing](#testing)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/Kushmanmb/BeyondGlobal.git
cd BeyondGlobal

# Install dependencies
yarn install

# Copy environment template
cp .env.example .env
# Edit .env with your configuration

# Run tests
npm test

# Start the application
npm start
```

## 📁 Project Structure

```
BeyondGlobal/
├── contracts/              # Ethereum smart contracts
│   └── KairosToken.sol    # ERC20-like token contract
├── scripts/               # Deployment and utility scripts
│   └── ethereum-deploy.js # Smart contract deployment utility
├── frontend/              # Web frontend
│   ├── index.html        # Main application page
│   └── metamask-integration.js  # MetaMask Web3 integration
├── cosmic_blockchain_deploy/    # Blockchain deployment system
│   ├── scripts/          # Platform-specific deployment scripts
│   ├── cosmic_blockchain.js    # JavaScript blockchain implementation
│   └── README.txt        # Deployment instructions
├── docs/                 # Documentation
│   ├── DEPLOYMENT.md     # Comprehensive deployment guide
│   └── SFML_INTEGRATION.md    # Graphics integration guide
├── index.js              # Etherscan API integration
├── test.js               # Test suite
├── package.json          # Node.js dependencies
└── .env.example          # Environment configuration template
```

## 🔧 Installation

### Prerequisites

- **Node.js** v14.x or higher
- **npm** or **yarn**
- **Git**
- **MetaMask** browser extension

### Dependencies

Install all required dependencies:

```bash
# Using npm
npm install

# Using yarn
yarn install
```

### Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your configuration:
   - Add your Ethereum wallet private key
   - Add your Infura project ID (optional)
   - Add your Etherscan API key (optional)

3. **Important**: Never commit `.env` to version control!

## 💻 Usage

### Running the Application

```bash
# Start the main application
npm start

# Query Etherscan API
npm run query-etherscan

# Run tests
npm test
```

### Frontend Development

```bash
# Serve frontend locally
npx http-server frontend -p 8080

# Or use Python
python -m http.server 8080 --directory frontend
```

Open http://localhost:8080 in your browser with MetaMask installed.

### Blockchain Deployment

Deploy the cosmic blockchain:

```bash
# Linux/Mac
cd cosmic_blockchain_deploy
./scripts/deploy_linux.sh

# Windows
cd cosmic_blockchain_deploy
scripts\deploy_windows.bat
```

## 🔐 Smart Contracts

### KairosToken Contract

Located in `contracts/KairosToken.sol`

**Features:**
- ERC20-like token functionality
- Minting and burning capabilities
- Transfer and approval mechanisms
- Owner-controlled operations

### Deploying Contracts

```bash
# Validate and get deployment instructions
node scripts/ethereum-deploy.js localhost

# For testnet/mainnet deployment
node scripts/ethereum-deploy.js sepolia
```

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

## 🌐 Frontend

### MetaMask Integration

The frontend provides a user-friendly interface for:
- Connecting to MetaMask wallet
- Viewing account balance and network info
- Interacting with smart contracts
- Monitoring transaction status

### Key Components

- **`frontend/index.html`**: Main application interface
- **`frontend/metamask-integration.js`**: Web3 integration class

### Usage Example

```javascript
const web3 = new KairosWeb3Integration();

// Initialize and connect
await web3.initialize();
const accounts = await web3.connect();

// Get balance
const balance = await web3.getBalance(accounts[0]);
console.log('Balance:', balance, 'ETH');
```

## 📦 Deployment

### Local Development

```bash
# Start local blockchain (Hardhat)
npx hardhat node

# Deploy contract to local network
node scripts/ethereum-deploy.js localhost
```

### Testnet Deployment (Sepolia)

```bash
# Configure .env with your keys
# Deploy to Sepolia testnet
node scripts/ethereum-deploy.js sepolia
```

### Production Deployment

For production deployment instructions, see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

**Important Production Checklist:**
- [ ] Use hardware wallet for mainnet deployments
- [ ] Audit smart contracts before deployment
- [ ] Enable HTTPS for frontend
- [ ] Configure proper CORS settings
- [ ] Set up monitoring and alerts
- [ ] Create backup and recovery procedures

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Test Components

- **Module Validation**: Verifies all exports and configurations
- **API Integration**: Tests Etherscan API connectivity
- **Contract Validation**: Validates smart contract structure

### Manual Testing

1. **Smart Contract Testing**:
   ```bash
   node scripts/ethereum-deploy.js localhost
   ```

2. **Frontend Testing**:
   - Open `frontend/index.html` in browser
   - Connect MetaMask
   - Test all interactions

3. **API Testing**:
   ```bash
   node index.js
   ```

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)**: Complete deployment guide
- **[SFML_INTEGRATION.md](docs/SFML_INTEGRATION.md)**: Graphics integration guide
- **[ETHERSCAN_API.md](ETHERSCAN_API.md)**: Etherscan API documentation

## 🗺️ Roadmap

### Phase 1: Planning and Setup ✅
- [x] Defined project scope and objectives
- [x] Established repository and project structure

### Phase 2: Blockchain Development (75% Complete)
- [x] Implemented Bitcoin blockchain integration
- [x] Developed Ethereum smart contract functionality
- [ ] Complete SFML graphics/renderer integration

### Phase 3: Frontend and Deployment (60% Complete)
- [x] Developed frontend UI/UX
- [x] Implemented frontend logic and integration
- [x] Created deployment scripts and documentation

### Phase 4: Testing and Launch (Not Started)
- [ ] Conduct thorough testing and debugging
- [ ] Launch production-ready application

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ethereum Foundation** for blockchain technology
- **MetaMask** for Web3 wallet integration
- **SFML** for graphics library
- **Etherscan** for blockchain API services

## 📞 Support

For support and questions:

- **GitHub Issues**: https://github.com/Kushmanmb/BeyondGlobal/issues
- **Email**: support@kairos-blockchain.io
- **Documentation**: https://docs.kairos-blockchain.io

## 🔒 Security

### Reporting Security Issues

If you discover a security vulnerability, please email security@kairos-blockchain.io instead of using the issue tracker.

### Best Practices

- Never commit private keys or secrets
- Use environment variables for sensitive data
- Keep dependencies up to date
- Audit smart contracts before mainnet deployment
- Use hardware wallets for production

---

**Made with ❤️ by the Kairos Team**

**Version**: 1.0.0  
**Last Updated**: February 22, 2026
