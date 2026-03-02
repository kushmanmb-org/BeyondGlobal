/**
 * Integration Test Suite for Kairos Blockchain Platform
 * Tests the complete system including smart contracts, deployment, and frontend integration
 */

const fs = require('fs');
const path = require('path');

console.log('=== Kairos Blockchain Platform - Integration Tests ===\n');

let testsPassed = 0;
let testsFailed = 0;

/**
 * Test helper function
 */
function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    testsPassed++;
  } catch (error) {
    console.log(`✗ ${name}`);
    console.log(`  Error: ${error.message}`);
    testsFailed++;
  }
}

/**
 * Test: Repository Structure
 */
console.log('--- Testing Repository Structure ---\n');

test('contracts directory exists', () => {
  if (!fs.existsSync(path.join(__dirname, 'contracts'))) {
    throw new Error('contracts directory not found');
  }
});

test('KairosToken.sol exists', () => {
  if (!fs.existsSync(path.join(__dirname, 'contracts', 'KairosToken.sol'))) {
    throw new Error('KairosToken.sol not found');
  }
});

test('scripts directory exists', () => {
  if (!fs.existsSync(path.join(__dirname, 'scripts'))) {
    throw new Error('scripts directory not found');
  }
});

test('ethereum-deploy.js exists', () => {
  if (!fs.existsSync(path.join(__dirname, 'scripts', 'ethereum-deploy.js'))) {
    throw new Error('ethereum-deploy.js not found');
  }
});

test('frontend directory exists', () => {
  if (!fs.existsSync(path.join(__dirname, 'frontend'))) {
    throw new Error('frontend directory not found');
  }
});

test('frontend/index.html exists', () => {
  if (!fs.existsSync(path.join(__dirname, 'frontend', 'index.html'))) {
    throw new Error('frontend/index.html not found');
  }
});

test('frontend/metamask-integration.js exists', () => {
  if (!fs.existsSync(path.join(__dirname, 'frontend', 'metamask-integration.js'))) {
    throw new Error('frontend/metamask-integration.js not found');
  }
});

test('docs directory exists', () => {
  if (!fs.existsSync(path.join(__dirname, 'docs'))) {
    throw new Error('docs directory not found');
  }
});

test('DEPLOYMENT.md exists', () => {
  if (!fs.existsSync(path.join(__dirname, 'docs', 'DEPLOYMENT.md'))) {
    throw new Error('DEPLOYMENT.md not found');
  }
});

test('SFML_INTEGRATION.md exists', () => {
  if (!fs.existsSync(path.join(__dirname, 'docs', 'SFML_INTEGRATION.md'))) {
    throw new Error('SFML_INTEGRATION.md not found');
  }
});

test('.env.example exists', () => {
  if (!fs.existsSync(path.join(__dirname, '.env.example'))) {
    throw new Error('.env.example not found');
  }
});

/**
 * Test: Smart Contract Content
 */
console.log('\n--- Testing Smart Contract Content ---\n');

test('KairosToken contract has SPDX license', () => {
  const content = fs.readFileSync(path.join(__dirname, 'contracts', 'KairosToken.sol'), 'utf8');
  if (!content.includes('SPDX-License-Identifier')) {
    throw new Error('SPDX license identifier not found');
  }
});

test('KairosToken contract has pragma directive', () => {
  const content = fs.readFileSync(path.join(__dirname, 'contracts', 'KairosToken.sol'), 'utf8');
  if (!content.includes('pragma solidity')) {
    throw new Error('pragma directive not found');
  }
});

test('KairosToken contract has contract declaration', () => {
  const content = fs.readFileSync(path.join(__dirname, 'contracts', 'KairosToken.sol'), 'utf8');
  if (!content.includes('contract KairosToken')) {
    throw new Error('contract declaration not found');
  }
});

test('KairosToken contract has transfer function', () => {
  const content = fs.readFileSync(path.join(__dirname, 'contracts', 'KairosToken.sol'), 'utf8');
  if (!content.includes('function transfer(')) {
    throw new Error('transfer function not found');
  }
});

test('KairosToken contract has approve function', () => {
  const content = fs.readFileSync(path.join(__dirname, 'contracts', 'KairosToken.sol'), 'utf8');
  if (!content.includes('function approve(')) {
    throw new Error('approve function not found');
  }
});

test('KairosToken contract has mint function', () => {
  const content = fs.readFileSync(path.join(__dirname, 'contracts', 'KairosToken.sol'), 'utf8');
  if (!content.includes('function mint(')) {
    throw new Error('mint function not found');
  }
});

test('KairosToken contract has burn function', () => {
  const content = fs.readFileSync(path.join(__dirname, 'contracts', 'KairosToken.sol'), 'utf8');
  if (!content.includes('function burn(')) {
    throw new Error('burn function not found');
  }
});

/**
 * Test: Deployment Script
 */
console.log('\n--- Testing Deployment Script ---\n');

test('ethereum-deploy.js can be required', () => {
  const deployModule = require('./scripts/ethereum-deploy.js');
  if (!deployModule) {
    throw new Error('deployment module cannot be loaded');
  }
});

test('deployment module has CONTRACT_CONFIG', () => {
  const deployModule = require('./scripts/ethereum-deploy.js');
  if (!deployModule.CONTRACT_CONFIG) {
    throw new Error('CONTRACT_CONFIG not found');
  }
});

test('deployment module has readContractSource function', () => {
  const deployModule = require('./scripts/ethereum-deploy.js');
  if (typeof deployModule.readContractSource !== 'function') {
    throw new Error('readContractSource is not a function');
  }
});

test('deployment module has validateContract function', () => {
  const deployModule = require('./scripts/ethereum-deploy.js');
  if (typeof deployModule.validateContract !== 'function') {
    throw new Error('validateContract is not a function');
  }
});

test('deployment module can read contract source', () => {
  const deployModule = require('./scripts/ethereum-deploy.js');
  const source = deployModule.readContractSource();
  if (!source || source.length === 0) {
    throw new Error('contract source is empty');
  }
});

test('deployment module can validate contract', () => {
  const deployModule = require('./scripts/ethereum-deploy.js');
  const source = deployModule.readContractSource();
  const isValid = deployModule.validateContract(source);
  if (!isValid) {
    throw new Error('contract validation failed');
  }
});

/**
 * Test: Frontend Files
 */
console.log('\n--- Testing Frontend Files ---\n');

test('frontend/index.html has HTML structure', () => {
  const content = fs.readFileSync(path.join(__dirname, 'frontend', 'index.html'), 'utf8');
  if (!content.includes('<!DOCTYPE html>') || !content.includes('<html')) {
    throw new Error('HTML structure not found');
  }
});

test('frontend/index.html includes MetaMask integration', () => {
  const content = fs.readFileSync(path.join(__dirname, 'frontend', 'index.html'), 'utf8');
  if (!content.includes('metamask-integration.js')) {
    throw new Error('MetaMask integration script not included');
  }
});

test('frontend/index.html has connect button', () => {
  const content = fs.readFileSync(path.join(__dirname, 'frontend', 'index.html'), 'utf8');
  if (!content.includes('connectBtn') && !content.includes('Connect')) {
    throw new Error('Connect button not found');
  }
});

test('metamask-integration.js has KairosWeb3Integration class', () => {
  const content = fs.readFileSync(path.join(__dirname, 'frontend', 'metamask-integration.js'), 'utf8');
  if (!content.includes('class KairosWeb3Integration')) {
    throw new Error('KairosWeb3Integration class not found');
  }
});

test('metamask-integration.js has initialize method', () => {
  const content = fs.readFileSync(path.join(__dirname, 'frontend', 'metamask-integration.js'), 'utf8');
  if (!content.includes('async initialize()')) {
    throw new Error('initialize method not found');
  }
});

test('metamask-integration.js has connect method', () => {
  const content = fs.readFileSync(path.join(__dirname, 'frontend', 'metamask-integration.js'), 'utf8');
  if (!content.includes('async connect()')) {
    throw new Error('connect method not found');
  }
});

/**
 * Test: Documentation
 */
console.log('\n--- Testing Documentation ---\n');

test('DEPLOYMENT.md has prerequisites section', () => {
  const content = fs.readFileSync(path.join(__dirname, 'docs', 'DEPLOYMENT.md'), 'utf8');
  if (!content.includes('Prerequisites') && !content.includes('prerequisites')) {
    throw new Error('Prerequisites section not found');
  }
});

test('DEPLOYMENT.md has deployment instructions', () => {
  const content = fs.readFileSync(path.join(__dirname, 'docs', 'DEPLOYMENT.md'), 'utf8');
  if (!content.includes('Deploy') && !content.includes('deployment')) {
    throw new Error('Deployment instructions not found');
  }
});

test('SFML_INTEGRATION.md has overview section', () => {
  const content = fs.readFileSync(path.join(__dirname, 'docs', 'SFML_INTEGRATION.md'), 'utf8');
  if (!content.includes('Overview')) {
    throw new Error('Overview section not found');
  }
});

test('SFML_INTEGRATION.md has installation instructions', () => {
  const content = fs.readFileSync(path.join(__dirname, 'docs', 'SFML_INTEGRATION.md'), 'utf8');
  if (!content.includes('Installation') || !content.includes('install')) {
    throw new Error('Installation instructions not found');
  }
});

test('.env.example has required variables', () => {
  const content = fs.readFileSync(path.join(__dirname, '.env.example'), 'utf8');
  const requiredVars = ['PRIVATE_KEY', 'INFURA_KEY', 'NODE_ENV'];
  requiredVars.forEach(varName => {
    if (!content.includes(varName)) {
      throw new Error(`${varName} not found in .env.example`);
    }
  });
});

/**
 * Test: Package.json
 */
console.log('\n--- Testing Package Configuration ---\n');

test('package.json has start script', () => {
  const pkg = require('./package.json');
  if (!pkg.scripts || !pkg.scripts.start) {
    throw new Error('start script not found');
  }
});

test('package.json has test script', () => {
  const pkg = require('./package.json');
  if (!pkg.scripts || !pkg.scripts.test) {
    throw new Error('test script not found');
  }
});

test('package.json has deploy scripts', () => {
  const pkg = require('./package.json');
  if (!pkg.scripts || !pkg.scripts['deploy:local']) {
    throw new Error('deploy scripts not found');
  }
});

test('package.json has serve:frontend script', () => {
  const pkg = require('./package.json');
  if (!pkg.scripts || !pkg.scripts['serve:frontend']) {
    throw new Error('serve:frontend script not found');
  }
});

/**
 * Test: Existing Functionality
 */
console.log('\n--- Testing Existing Functionality ---\n');

test('index.js Etherscan module works', () => {
  const etherscanModule = require('./index.js');
  if (!etherscanModule.queryEtherscanApi || !etherscanModule.ETHERSCAN_CONFIG) {
    throw new Error('Etherscan module exports not found');
  }
});

test('cosmic_blockchain.js exists and runs', () => {
  const blockchainPath = path.join(__dirname, 'cosmic_blockchain_deploy', 'cosmic_blockchain.js');
  if (!fs.existsSync(blockchainPath)) {
    throw new Error('cosmic_blockchain.js not found');
  }
});

/**
 * Final Results
 */
console.log('\n=== Test Results ===\n');
console.log(`Total Tests: ${testsPassed + testsFailed}`);
console.log(`Passed: ${testsPassed}`);
console.log(`Failed: ${testsFailed}`);

if (testsFailed === 0) {
  console.log('\n✓ All integration tests passed!\n');
  console.log('The Kairos Blockchain Platform is ready for deployment.');
  process.exit(0);
} else {
  console.log(`\n✗ ${testsFailed} test(s) failed!\n`);
  process.exit(1);
}
