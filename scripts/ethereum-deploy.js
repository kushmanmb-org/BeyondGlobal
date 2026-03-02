/**
 * Ethereum Smart Contract Deployment Utility
 * Handles contract compilation, deployment, and interaction
 */

const fs = require('fs');
const path = require('path');

/**
 * Contract deployment configuration
 */
const CONTRACT_CONFIG = {
  contractName: 'KairosToken',
  contractPath: path.join(__dirname, '../contracts/KairosToken.sol'),
  initialSupply: 1000000, // 1 million tokens
  networks: {
    localhost: {
      url: 'http://localhost:8545',
      chainId: 1337
    },
    sepolia: {
      url: 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY',
      chainId: 11155111
    },
    mainnet: {
      url: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
      chainId: 1
    }
  }
};

/**
 * Reads the smart contract source code
 * @returns {string} Contract source code
 */
function readContractSource() {
  try {
    const contractSource = fs.readFileSync(CONTRACT_CONFIG.contractPath, 'utf8');
    console.log(`✓ Read contract source: ${CONTRACT_CONFIG.contractName}`);
    return contractSource;
  } catch (error) {
    console.error(`✗ Failed to read contract: ${error.message}`);
    throw error;
  }
}

/**
 * Validates contract source code for basic syntax
 * @param {string} source Contract source code
 * @returns {boolean} True if validation passes
 */
function validateContract(source) {
  // Basic validation checks
  const checks = [
    { pattern: /pragma solidity/, message: 'Solidity pragma directive' },
    { pattern: /contract\s+\w+/, message: 'Contract declaration' },
    { pattern: /constructor/, message: 'Constructor function' },
    { pattern: /function\s+\w+/, message: 'Function definitions' }
  ];
  
  console.log('\nValidating contract structure...');
  let allPassed = true;
  
  checks.forEach(check => {
    if (check.pattern.test(source)) {
      console.log(`  ✓ ${check.message} found`);
    } else {
      console.log(`  ✗ ${check.message} missing`);
      allPassed = false;
    }
  });
  
  return allPassed;
}

/**
 * Generates deployment instructions
 * @param {string} network Target network for deployment
 */
function generateDeploymentInstructions(network = 'localhost') {
  const networkConfig = CONTRACT_CONFIG.networks[network];
  
  if (!networkConfig) {
    console.error(`✗ Unknown network: ${network}`);
    return;
  }
  
  console.log('\n=== Deployment Instructions ===');
  console.log(`\nContract: ${CONTRACT_CONFIG.contractName}`);
  console.log(`Network: ${network}`);
  console.log(`Chain ID: ${networkConfig.chainId}`);
  console.log(`RPC URL: ${networkConfig.url}`);
  console.log(`Initial Supply: ${CONTRACT_CONFIG.initialSupply} tokens`);
  
  console.log('\n--- Prerequisites ---');
  console.log('1. Install Hardhat or Truffle framework:');
  console.log('   npm install --save-dev hardhat');
  console.log('   or');
  console.log('   npm install -g truffle');
  
  console.log('\n2. Set up environment variables:');
  console.log('   - PRIVATE_KEY: Your wallet private key');
  console.log('   - INFURA_KEY: Your Infura project key (for testnet/mainnet)');
  
  console.log('\n--- Deployment Steps ---');
  console.log('1. Compile the contract:');
  console.log('   npx hardhat compile');
  
  console.log('\n2. Deploy to network:');
  console.log(`   npx hardhat run scripts/deploy.js --network ${network}`);
  
  console.log('\n3. Verify contract (optional):');
  console.log('   npx hardhat verify --network <network> <deployed-address> <constructor-args>');
  
  console.log('\n--- Post-Deployment ---');
  console.log('- Save the deployed contract address');
  console.log('- Update frontend configuration with contract address and ABI');
  console.log('- Test contract functions through web3 interface');
  console.log('- Monitor contract on Etherscan\n');
}

/**
 * Creates a sample Hardhat deployment script
 * @returns {string} Deployment script content
 */
function generateHardhatDeployScript() {
  return `// Hardhat deployment script for ${CONTRACT_CONFIG.contractName}
const hre = require("hardhat");

async function main() {
  console.log("Deploying ${CONTRACT_CONFIG.contractName}...");
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  
  const initialSupply = ${CONTRACT_CONFIG.initialSupply};
  const Token = await hre.ethers.getContractFactory("${CONTRACT_CONFIG.contractName}");
  const token = await Token.deploy(initialSupply);
  
  await token.deployed();
  
  console.log("${CONTRACT_CONFIG.contractName} deployed to:", token.address);
  console.log("Initial supply:", initialSupply, "tokens");
  console.log("Transaction hash:", token.deployTransaction.hash);
  
  // Wait for a few confirmations
  console.log("Waiting for confirmations...");
  await token.deployTransaction.wait(5);
  
  console.log("Deployment confirmed!");
  
  return token.address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
`;
}

/**
 * Creates a sample Hardhat configuration file
 * @returns {string} Hardhat config content
 */
function generateHardhatConfig() {
  return `require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    localhost: {
      url: "http://localhost:8545"
    },
    sepolia: {
      url: process.env.SEPOLIA_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    },
    mainnet: {
      url: process.env.MAINNET_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
`;
}

/**
 * Generates contract interaction utilities
 * @returns {string} Interaction utilities code
 */
function generateInteractionUtils() {
  return `// Contract interaction utilities for ${CONTRACT_CONFIG.contractName}
const { ethers } = require("ethers");

// Contract ABI (update after compilation)
const CONTRACT_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 value) returns (bool)",
  "function approve(address spender, uint256 value) returns (bool)",
  "function transferFrom(address from, address to, uint256 value) returns (bool)",
  "function mint(address to, uint256 value) returns (bool)",
  "function burn(uint256 value) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];

class KairosTokenInteraction {
  constructor(contractAddress, providerUrl, privateKey) {
    this.contractAddress = contractAddress;
    this.provider = new ethers.providers.JsonRpcProvider(providerUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.contract = new ethers.Contract(contractAddress, CONTRACT_ABI, this.wallet);
  }
  
  async getTokenInfo() {
    const name = await this.contract.name();
    const symbol = await this.contract.symbol();
    const decimals = await this.contract.decimals();
    const totalSupply = await this.contract.totalSupply();
    
    return { name, symbol, decimals, totalSupply: totalSupply.toString() };
  }
  
  async getBalance(address) {
    const balance = await this.contract.balanceOf(address);
    return balance.toString();
  }
  
  async transfer(to, amount) {
    const tx = await this.contract.transfer(to, amount);
    const receipt = await tx.wait();
    return receipt;
  }
  
  async approve(spender, amount) {
    const tx = await this.contract.approve(spender, amount);
    const receipt = await tx.wait();
    return receipt;
  }
}

module.exports = { KairosTokenInteraction, CONTRACT_ABI };
`;
}

// Export utilities
module.exports = {
  CONTRACT_CONFIG,
  readContractSource,
  validateContract,
  generateDeploymentInstructions,
  generateHardhatDeployScript,
  generateHardhatConfig,
  generateInteractionUtils
};

// CLI execution
if (require.main === module) {
  console.log('=== Ethereum Smart Contract Deployment Utility ===\n');
  
  try {
    // Read and validate contract
    const source = readContractSource();
    const isValid = validateContract(source);
    
    if (isValid) {
      console.log('\n✓ Contract validation passed');
      
      // Generate deployment instructions
      const network = process.argv[2] || 'localhost';
      generateDeploymentInstructions(network);
      
      // Offer to generate helper files
      console.log('--- Helper Files Available ---');
      console.log('Run with additional arguments to generate:');
      console.log('  node ethereum-deploy.js generate-deploy-script');
      console.log('  node ethereum-deploy.js generate-hardhat-config');
      console.log('  node ethereum-deploy.js generate-interaction-utils');
    } else {
      console.log('\n✗ Contract validation failed');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    process.exit(1);
  }
}
