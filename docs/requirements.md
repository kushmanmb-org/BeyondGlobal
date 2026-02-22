# System Requirements and Dependencies

## Minimum System Requirements

### Hardware
- **CPU**: 2+ cores
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 10GB available space
- **Network**: Stable internet connection for blockchain interactions

### Operating System
- **Linux**: Ubuntu 20.04+, Debian 10+, or equivalent
- **macOS**: 10.15 (Catalina) or later
- **Windows**: Windows 10/11 with WSL2 (recommended) or native Windows

## Software Dependencies

### Required

#### Node.js
- **Version**: 16.x or higher (18.x recommended)
- **Installation**:
  ```bash
  # Ubuntu/Debian
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
  
  # macOS (using Homebrew)
  brew install node@18
  
  # Windows
  # Download installer from https://nodejs.org/
  ```

#### Package Manager
- **Yarn**: 1.22.x or higher (preferred)
  ```bash
  npm install -g yarn
  ```
- **npm**: 8.x or higher (included with Node.js)

#### Git
- **Version**: 2.20+
- **Installation**:
  ```bash
  # Ubuntu/Debian
  sudo apt-get install git
  
  # macOS
  brew install git
  ```

### Core Dependencies

#### Blockchain Integration
- `@metamask/smart-accounts-kit`: ^0.3.0
  - MetaMask smart account functionality
  - Account abstraction support
  - Transaction bundling

#### Development Dependencies
- **TypeScript**: ^5.0.0 (if using TypeScript)
- **ESLint**: ^8.0.0 (code quality)
- **Prettier**: ^3.0.0 (code formatting)
- **Jest**: ^29.0.0 (testing framework)

### Optional Dependencies

#### Frontend Development
- **React**: ^18.0.0
- **React DOM**: ^18.0.0
- **Web3Modal**: ^3.0.0
- **TailwindCSS**: ^3.0.0

#### Blockchain Libraries
- **ethers.js**: ^6.0.0 or **web3.js**: ^4.0.0
- **@safe-global/safe-core-sdk**: For Safe (Gnosis Safe) integration
- **viem**: Modern alternative to ethers.js

#### Development Tools
- **Hardhat**: ^2.0.0 (smart contract development)
- **Docker**: 20.10+ (containerization)
- **Docker Compose**: 2.0+ (multi-container orchestration)

## Browser Requirements (Frontend)

### Supported Browsers
- **Chrome/Chromium**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Brave**: Latest version

### Browser Extensions Required
- **MetaMask**: Latest version
  - Available at: https://metamask.io/download/

## Blockchain Requirements

### Network Access
- Access to Ethereum mainnet or testnets (Sepolia, Goerli)
- RPC endpoints (Infura, Alchemy, or custom node)

### API Keys (Optional but Recommended)
- **Etherscan API Key**: For transaction verification
  - Register at: https://etherscan.io/apis
- **Infura Project ID**: For blockchain RPC access
  - Register at: https://infura.io/
- **Alchemy API Key**: Alternative to Infura
  - Register at: https://www.alchemy.com/

## Installation

### Quick Start
```bash
# Clone the repository
git clone https://github.com/Kushmanmb/BeyondGlobal.git
cd BeyondGlobal

# Install dependencies
yarn install
# or
npm install

# Run the application
yarn start
# or
npm start
```

### Verify Installation
```bash
# Check Node.js version
node --version  # Should be v16.x or higher

# Check npm version
npm --version   # Should be 8.x or higher

# Check yarn version (if using Yarn)
yarn --version  # Should be 1.22.x or higher

# Run tests
yarn test
# or
npm test
```

## Environment Configuration

### Environment Variables
Create a `.env` file in the project root:

```env
# Network Configuration
NETWORK=mainnet  # or sepolia, goerli
RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID

# API Keys
ETHERSCAN_API_KEY=your_etherscan_api_key
INFURA_PROJECT_ID=your_infura_project_id

# Application Configuration
PORT=3000
NODE_ENV=development  # or production
```

## Troubleshooting

### Common Issues

#### Node Version Issues
If you encounter errors related to Node.js version:
```bash
# Use nvm to manage Node.js versions
nvm install 18
nvm use 18
```

#### Dependency Installation Failures
```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock package-lock.json
yarn install
# or
npm install
```

#### MetaMask Connection Issues
- Ensure MetaMask is installed and unlocked
- Check that you're on the correct network
- Clear MetaMask cache and reconnect

## Security Considerations

### Best Practices
- Never commit `.env` files or API keys to version control
- Use environment variables for sensitive configuration
- Keep dependencies up to date: `yarn upgrade` or `npm update`
- Run security audits: `yarn audit` or `npm audit`

### Recommended Security Tools
- **npm audit**: Built-in security vulnerability checker
- **Snyk**: Continuous security monitoring
- **Dependabot**: Automated dependency updates (GitHub)

## Support

For issues related to:
- **Dependencies**: Check package.json and this requirements document
- **Installation**: Refer to the Quick Start guide above
- **Configuration**: See Environment Configuration section
- **Bugs**: Open an issue on GitHub

---

*Last Updated: February 22, 2026*
