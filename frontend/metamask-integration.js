/**
 * MetaMask Frontend Integration for Kairos Blockchain Platform
 * Connects web frontend to Ethereum smart contracts via MetaMask
 */

class KairosWeb3Integration {
  constructor() {
    this.ethereum = null;
    this.accounts = [];
    this.chainId = null;
    this.contractAddress = null;
    this.contractABI = null;
    this.contract = null;
  }

  /**
   * Initialize Web3 connection and detect MetaMask
   * @returns {Promise<boolean>} Success status
   */
  async initialize() {
    // Check if MetaMask is installed
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      this.ethereum = window.ethereum;
      console.log('✓ MetaMask detected');
      
      // Set up event listeners
      this.setupEventListeners();
      
      return true;
    } else {
      console.error('✗ MetaMask not detected');
      this.showInstallPrompt();
      return false;
    }
  }

  /**
   * Connect to MetaMask wallet
   * @returns {Promise<string[]>} Connected account addresses
   */
  async connect() {
    try {
      // Request account access
      const accounts = await this.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      this.accounts = accounts;
      console.log('✓ Connected accounts:', accounts);
      
      // Get current chain ID
      this.chainId = await this.ethereum.request({ 
        method: 'eth_chainId' 
      });
      console.log('✓ Current chain ID:', this.chainId);
      
      return accounts;
    } catch (error) {
      console.error('✗ Connection error:', error.message);
      throw error;
    }
  }

  /**
   * Setup event listeners for MetaMask events
   */
  setupEventListeners() {
    // Account changed event
    this.ethereum.on('accountsChanged', (accounts) => {
      console.log('Accounts changed:', accounts);
      this.accounts = accounts;
      this.onAccountsChanged(accounts);
    });

    // Chain changed event
    this.ethereum.on('chainChanged', (chainId) => {
      console.log('Chain changed:', chainId);
      this.chainId = chainId;
      this.onChainChanged(chainId);
      // Reload page on chain change as recommended
      window.location.reload();
    });

    // Disconnect event
    this.ethereum.on('disconnect', (error) => {
      console.log('Disconnected:', error);
      this.onDisconnect(error);
    });
  }

  /**
   * Get current account balance
   * @param {string} address Ethereum address
   * @returns {Promise<string>} Balance in ETH
   */
  async getBalance(address) {
    try {
      const balance = await this.ethereum.request({
        method: 'eth_getBalance',
        params: [address || this.accounts[0], 'latest']
      });
      
      // Convert from wei to ETH
      const ethBalance = parseInt(balance, 16) / Math.pow(10, 18);
      return ethBalance.toFixed(4);
    } catch (error) {
      console.error('✗ Failed to get balance:', error.message);
      throw error;
    }
  }

  /**
   * Initialize contract interaction
   * @param {string} contractAddress Contract address
   * @param {Array} contractABI Contract ABI
   */
  initializeContract(contractAddress, contractABI) {
    this.contractAddress = contractAddress;
    this.contractABI = contractABI;
    console.log('✓ Contract initialized:', contractAddress);
  }

  /**
   * Call a read-only contract method
   * @param {string} method Method name
   * @param {Array} params Method parameters
   * @returns {Promise<any>} Method result
   */
  async callContractMethod(method, params = []) {
    try {
      // Encode function call
      const data = this.encodeMethodCall(method, params);
      
      const result = await this.ethereum.request({
        method: 'eth_call',
        params: [{
          to: this.contractAddress,
          data: data
        }, 'latest']
      });
      
      return result;
    } catch (error) {
      console.error('✗ Contract call failed:', error.message);
      throw error;
    }
  }

  /**
   * Send a transaction to contract method
   * @param {string} method Method name
   * @param {Array} params Method parameters
   * @returns {Promise<string>} Transaction hash
   */
  async sendTransaction(method, params = []) {
    try {
      // Encode function call
      const data = this.encodeMethodCall(method, params);
      
      const transactionParameters = {
        to: this.contractAddress,
        from: this.accounts[0],
        data: data
      };
      
      const txHash = await this.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters]
      });
      
      console.log('✓ Transaction sent:', txHash);
      return txHash;
    } catch (error) {
      console.error('✗ Transaction failed:', error.message);
      throw error;
    }
  }

  /**
   * Switch to a different network
   * @param {string} chainId Target chain ID in hex
   */
  async switchNetwork(chainId) {
    try {
      await this.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainId }]
      });
      console.log('✓ Switched to chain:', chainId);
    } catch (error) {
      console.error('✗ Failed to switch network:', error.message);
      throw error;
    }
  }

  /**
   * Add a custom network to MetaMask
   * @param {Object} networkConfig Network configuration
   */
  async addNetwork(networkConfig) {
    try {
      await this.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [networkConfig]
      });
      console.log('✓ Network added:', networkConfig.chainName);
    } catch (error) {
      console.error('✗ Failed to add network:', error.message);
      throw error;
    }
  }

  /**
   * Encode method call for contract interaction
   * @param {string} method Method name
   * @param {Array} params Parameters
   * @returns {string} Encoded data
   */
  encodeMethodCall(method, params) {
    // This is a simplified version - in production use ethers.js or web3.js
    console.log('Encoding method call:', method, params);
    return '0x' + method; // Placeholder
  }

  /**
   * Show MetaMask installation prompt
   */
  showInstallPrompt() {
    const message = `
      MetaMask is not installed!
      
      Please install MetaMask to use this application:
      https://metamask.io/download/
    `;
    
    if (typeof window !== 'undefined' && window.confirm) {
      if (window.confirm(message + '\n\nOpen MetaMask website?')) {
        window.open('https://metamask.io/download/', '_blank');
      }
    } else {
      console.log(message);
    }
  }

  // Callback methods (override in implementation)
  onAccountsChanged(accounts) {
    console.log('Override onAccountsChanged to handle account changes');
  }

  onChainChanged(chainId) {
    console.log('Override onChainChanged to handle chain changes');
  }

  onDisconnect(error) {
    console.log('Override onDisconnect to handle disconnection');
  }
}

// Export for use in frontend
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KairosWeb3Integration;
}

// Browser global
if (typeof window !== 'undefined') {
  window.KairosWeb3Integration = KairosWeb3Integration;
}

/**
 * Example usage:
 * 
 * const web3 = new KairosWeb3Integration();
 * 
 * // Initialize and connect
 * await web3.initialize();
 * const accounts = await web3.connect();
 * 
 * // Get balance
 * const balance = await web3.getBalance(accounts[0]);
 * console.log('Balance:', balance, 'ETH');
 * 
 * // Initialize contract
 * web3.initializeContract('0x...', contractABI);
 * 
 * // Call contract method
 * const result = await web3.callContractMethod('balanceOf', [accounts[0]]);
 * 
 * // Send transaction
 * const txHash = await web3.sendTransaction('transfer', ['0x...', '1000']);
 */
