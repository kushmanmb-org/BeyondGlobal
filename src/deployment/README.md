# Deployment Scripts

This directory contains deployment automation scripts and configurations for the Kairos Blockchain Platform.

## Files

- **index.js**: Main deployment orchestration script
- **cosmic_blockchain.js**: Legacy Cosmic Blockchain deployment script
- **scripts/**: Platform-specific deployment scripts
  - `deploy_linux.sh`: Linux deployment
  - `deploy_mac.sh`: macOS deployment
  - `deploy_windows.bat`: Windows deployment
- **lib/**: SDK libraries for blockchain integrations
- **img/**: Deployment-related images and assets

## Usage

### Basic Deployment

```bash
# Deploy to development environment (default)
node src/deployment/index.js

# Deploy to specific environment
node src/deployment/index.js development
node src/deployment/index.js staging
node src/deployment/index.js production
```

### Programmatic Usage

```javascript
const { deploy, getDeploymentConfig } = require('./src/deployment/index.js');

// Deploy to staging
const result = await deploy('staging');
if (result.success) {
  console.log('Deployment successful!');
} else {
  console.error('Deployment failed:', result.error);
}

// Get configuration for an environment
const config = getDeploymentConfig('production');
console.log(config);
```

## Environments

### Development
- **Network**: Sepolia Testnet
- **Purpose**: Local development and testing
- **RPC**: Sepolia Infura endpoint

### Staging
- **Network**: Goerli Testnet
- **Purpose**: Pre-production testing
- **RPC**: Goerli Infura endpoint

### Production
- **Network**: Ethereum Mainnet
- **Purpose**: Live production deployment
- **RPC**: Mainnet Infura endpoint

## Deployment Process

The deployment script follows a 5-step process:

1. **Pre-deployment Checks**
   - Verify dependencies are installed
   - Check configuration files
   - Validate environment

2. **Build Application**
   - Compile source code
   - Bundle assets
   - Optimize for production

3. **Deploy Smart Contracts**
   - Deploy contracts to target network
   - Verify contract deployment
   - Save deployment addresses

4. **Configure Application**
   - Set up environment variables
   - Configure network connections
   - Initialize application settings

5. **Post-deployment Verification**
   - Run verification tests
   - Check contract functionality
   - Validate deployment success

## Platform-Specific Scripts

### Linux/macOS

```bash
# Make script executable
chmod +x src/deployment/scripts/deploy_linux.sh

# Run deployment
./src/deployment/scripts/deploy_linux.sh
```

### Windows

```batch
REM Run deployment script
src\deployment\scripts\deploy_windows.bat
```

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Network Configuration
NETWORK=mainnet
RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID

# API Keys
ETHERSCAN_API_KEY=your_etherscan_key
INFURA_PROJECT_ID=your_infura_project_id

# Deployment Settings
DEPLOY_ENVIRONMENT=production
GAS_LIMIT=8000000
GAS_PRICE=auto
```

### Deployment Config

The deployment configuration is defined in `index.js`:

```javascript
const DEPLOYMENT_CONFIG = {
  environments: {
    development: { ... },
    staging: { ... },
    production: { ... }
  },
  defaultEnvironment: 'development'
};
```

## Legacy Deployment

The `cosmic_blockchain_deploy` directory contains legacy deployment files:

```bash
# Extract and run legacy deployment
cd cosmic_blockchain_deploy
./cosmic_blockchain  # Linux
cosmic_blockchain.exe  # Windows
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Deploy to production
        run: node src/deployment/index.js production
        env:
          INFURA_PROJECT_ID: ${{ secrets.INFURA_PROJECT_ID }}
          ETHERSCAN_API_KEY: ${{ secrets.ETHERSCAN_API_KEY }}
```

## Troubleshooting

### Common Issues

**Dependencies not found**
```bash
# Install dependencies
npm install
# or
yarn install
```

**Permission denied on scripts**
```bash
# Make scripts executable
chmod +x src/deployment/scripts/*.sh
```

**Network connection issues**
- Check your RPC URL is correct
- Verify API keys are valid
- Ensure network connectivity

## Security Best Practices

- Never commit API keys or secrets to version control
- Use environment variables for sensitive data
- Rotate API keys regularly
- Use different keys for different environments
- Enable 2FA on service accounts

## Future Enhancements

- [ ] Docker containerization
- [ ] Kubernetes deployment configs
- [ ] Automated rollback on failure
- [ ] Blue-green deployment support
- [ ] Canary deployment strategy
- [ ] Multi-region deployment
