/**
 * Frontend Application Entry Point
 * 
 * This is the main entry point for the frontend application.
 * It will handle UI/UX and user interactions with the blockchain.
 */

/**
 * Frontend Configuration
 */
const FRONTEND_CONFIG = {
  appName: 'Kairos Blockchain Platform',
  version: '1.0.0',
  features: {
    walletConnection: true,
    smartAccounts: true,
    transactionHistory: true,
    multiChain: true
  }
};

/**
 * Initialize the frontend application
 */
function initializeApp() {
  console.log(`Initializing ${FRONTEND_CONFIG.appName} v${FRONTEND_CONFIG.version}`);
  
  // Check for browser compatibility
  if (typeof window === 'undefined') {
    console.error('This application requires a browser environment');
    return false;
  }
  
  // Check for MetaMask
  if (typeof window.ethereum === 'undefined') {
    console.warn('MetaMask not detected. Please install MetaMask to use this application.');
    return false;
  }
  
  console.log('✓ Frontend initialized successfully');
  return true;
}

/**
 * Connect to MetaMask wallet
 */
async function connectWallet() {
  try {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed');
    }
    
    console.log('Requesting wallet connection...');
    
    // Request account access
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    const selectedAccount = accounts[0];
    console.log(`✓ Connected to wallet: ${selectedAccount}`);
    
    return {
      success: true,
      account: selectedAccount,
      accounts
    };
  } catch (error) {
    console.error('Failed to connect wallet:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Disconnect wallet
 */
function disconnectWallet() {
  console.log('Disconnecting wallet...');
  // Note: MetaMask doesn't have a direct disconnect method
  // This is more of a UI state change
  return {
    success: true,
    message: 'Wallet disconnected from UI'
  };
}

/**
 * Get current wallet address
 */
async function getCurrentAccount() {
  try {
    if (typeof window.ethereum === 'undefined') {
      return null;
    }
    
    const accounts = await window.ethereum.request({ 
      method: 'eth_accounts' 
    });
    
    return accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error('Failed to get current account:', error.message);
    return null;
  }
}

/**
 * Switch network
 */
async function switchNetwork(chainId) {
  try {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed');
    }
    
    console.log(`Switching to chain ID: ${chainId}`);
    
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }]
    });
    
    console.log('✓ Network switched successfully');
    return { success: true };
  } catch (error) {
    console.error('Failed to switch network:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeApp,
    connectWallet,
    disconnectWallet,
    getCurrentAccount,
    switchNetwork,
    FRONTEND_CONFIG
  };
}

// Browser global exports
if (typeof window !== 'undefined') {
  window.KairosFrontend = {
    initializeApp,
    connectWallet,
    disconnectWallet,
    getCurrentAccount,
    switchNetwork,
    FRONTEND_CONFIG
  };
}
