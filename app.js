/**
 * MetaMask Smart Accounts Kit Demo - Frontend JavaScript
 * Handles wallet connection, network selection, and blockchain queries
 */

// State management
let currentAccount = null;
let isConnecting = false;

// DOM elements
const connectBtn = document.getElementById('connectBtn');
const accountDisplay = document.getElementById('accountDisplay');
const chainSelect = document.getElementById('chainSelect');
const chainInfo = document.getElementById('chainInfo');
const queryBtn = document.getElementById('queryBtn');
const accountInput = document.getElementById('accountInput');
const queryResults = document.getElementById('queryResults');
const etherscanBtn = document.getElementById('etherscanBtn');
const etherscanData = document.getElementById('etherscanData');

/**
 * Check if MetaMask is installed
 */
function isMetaMaskInstalled() {
  return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
}

/**
 * Connect to MetaMask wallet
 */
async function connectWallet() {
  if (!isMetaMaskInstalled()) {
    accountDisplay.className = 'status disconnected';
    accountDisplay.textContent = '⚠️ MetaMask not detected. Please install MetaMask extension.';
    return;
  }

  if (isConnecting) return;

  try {
    isConnecting = true;
    connectBtn.innerHTML = 'Connecting<span class="loading"></span>';
    connectBtn.disabled = true;

    // Request account access
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });

    if (accounts.length > 0) {
      currentAccount = accounts[0];
      updateAccountDisplay(currentAccount);
      connectBtn.textContent = 'Disconnect Wallet';
      connectBtn.disabled = false;
    }
  } catch (error) {
    console.error('Error connecting to MetaMask:', error);
    accountDisplay.className = 'status disconnected';
    accountDisplay.textContent = `❌ Connection failed: ${error.message}`;
    connectBtn.textContent = 'Connect MetaMask';
    connectBtn.disabled = false;
  } finally {
    isConnecting = false;
  }
}

/**
 * Disconnect wallet
 */
function disconnectWallet() {
  currentAccount = null;
  accountDisplay.className = 'status disconnected';
  accountDisplay.textContent = 'Not connected';
  connectBtn.textContent = 'Connect MetaMask';
}

/**
 * Update account display with formatted address
 */
function updateAccountDisplay(address) {
  const formattedAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  accountDisplay.className = 'status connected';
  accountDisplay.innerHTML = `
    ✅ Connected: <strong>${formattedAddress}</strong><br>
    <small>Full address: ${address}</small>
  `;
}

/**
 * Handle account changes
 */
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    disconnectWallet();
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    updateAccountDisplay(currentAccount);
  }
}

/**
 * Handle chain changes
 */
function handleChainChanged(chainId) {
  console.log('Chain changed to:', chainId);
  const chainName = getChainName(chainId);
  chainInfo.className = 'status info';
  chainInfo.textContent = `✅ Network changed to: ${chainName} (${chainId})`;
}

/**
 * Get chain name from chain ID
 */
function getChainName(chainId) {
  const chains = {
    '0x1': 'Ethereum Mainnet',
    '0x5': 'Goerli Testnet',
    '0xaa36a7': 'Sepolia Testnet',
    '0x89': 'Polygon Mainnet'
  };
  return chains[chainId] || `Chain ${chainId}`;
}

/**
 * Query smart account information
 */
async function querySmartAccount() {
  const address = accountInput.value.trim();
  
  // Validate Ethereum address format
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    queryResults.innerHTML = '<div class="status disconnected">❌ Please enter a valid Ethereum address (0x...)</div>';
    return;
  }

  queryBtn.innerHTML = 'Querying<span class="loading"></span>';
  queryBtn.disabled = true;

  try {
    // In a real implementation, this would query the smart account
    // For demo purposes, we'll show the address information
    const chainId = chainSelect.value;
    
    queryResults.innerHTML = `
      <div class="status info">
        <strong>Account Query Results:</strong><br>
        Address: ${address}<br>
        Chain: ${chainId}<br>
        <small>Note: Full smart account querying requires backend API integration</small>
      </div>
    `;

    // If MetaMask is connected, try to get balance
    if (isMetaMaskInstalled() && currentAccount) {
      try {
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest']
        });
        const balanceInEth = parseInt(balance, 16) / 1e18;
        queryResults.innerHTML += `
          <div class="status connected" style="margin-top: 10px;">
            💰 Balance: ${balanceInEth.toFixed(6)} ETH
          </div>
        `;
      } catch (balanceError) {
        console.error('Error fetching balance:', balanceError);
      }
    }
  } catch (error) {
    console.error('Error querying account:', error);
    queryResults.innerHTML = `<div class="status disconnected">❌ Query failed: ${error.message}</div>`;
  } finally {
    queryBtn.textContent = 'Query Account';
    queryBtn.disabled = false;
  }
}

/**
 * Fetch Etherscan API data
 * Note: This demonstrates the concept - in production, this would call your backend API
 */
async function fetchEtherscanData() {
  etherscanBtn.innerHTML = 'Fetching<span class="loading"></span>';
  etherscanBtn.disabled = true;

  try {
    const chainId = chainSelect.value;
    
    // Note: In production, you would call your backend endpoint that uses the queryEtherscanApi function
    // For demo purposes, we're showing what the response structure would look like
    const mockResponse = {
      message: 'This is a demonstration of the Etherscan API v2 integration',
      chainId: chainId,
      endpoint: `https://api.etherscan.io/v2/api?chainid=${chainId}`,
      note: 'In production, this would call the backend index.js queryEtherscanApi function',
      status: 'Demo Mode',
      backend: {
        module: 'index.js',
        function: 'queryEtherscanApi(chainId)',
        description: 'Use Node.js backend to query Etherscan API v2 with native HTTPS module'
      },
      usage: {
        cli: 'npm run query-etherscan',
        code: 'const { queryEtherscanApi } = require("./index.js"); queryEtherscanApi("eth");'
      }
    };

    etherscanData.innerHTML = `<pre>${JSON.stringify(mockResponse, null, 2)}</pre>`;
    
    chainInfo.className = 'status info';
    chainInfo.textContent = `ℹ️ To use real Etherscan API, run: npm run query-etherscan`;
  } catch (error) {
    console.error('Error fetching Etherscan data:', error);
    etherscanData.innerHTML = `<div class="status disconnected">❌ Failed to fetch data: ${error.message}</div>`;
  } finally {
    etherscanBtn.textContent = 'Fetch Etherscan API Info';
    etherscanBtn.disabled = false;
  }
}

/**
 * Handle chain selection change
 */
function handleChainSelection() {
  const selectedChain = chainSelect.value;
  chainInfo.className = 'status info';
  chainInfo.textContent = `Selected chain: ${chainSelect.options[chainSelect.selectedIndex].text}`;
}

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
  // Connect button
  connectBtn.addEventListener('click', () => {
    if (currentAccount) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  });

  // Chain selection
  chainSelect.addEventListener('change', handleChainSelection);

  // Query button
  queryBtn.addEventListener('click', querySmartAccount);

  // Enter key on account input
  accountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      querySmartAccount();
    }
  });

  // Etherscan button
  etherscanBtn.addEventListener('click', fetchEtherscanData);

  // Listen for MetaMask events if available
  if (isMetaMaskInstalled()) {
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
  }
}

/**
 * Check initial connection state
 */
async function checkInitialConnection() {
  if (isMetaMaskInstalled()) {
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_accounts' 
      });
      if (accounts.length > 0) {
        currentAccount = accounts[0];
        updateAccountDisplay(currentAccount);
        connectBtn.textContent = 'Disconnect Wallet';
      }
    } catch (error) {
      console.error('Error checking initial connection:', error);
    }
  } else {
    accountDisplay.className = 'status disconnected';
    accountDisplay.innerHTML = `
      ⚠️ MetaMask not detected<br>
      <small>Please install <a href="https://metamask.io/" target="_blank">MetaMask extension</a></small>
    `;
  }
}

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeEventListeners();
  checkInitialConnection();
  console.log('MetaMask Smart Accounts Kit Demo initialized');
});
