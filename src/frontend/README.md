# Frontend

This directory contains the user interface and frontend logic for the Kairos Blockchain Platform.

## Files

- **index.html**: Main web interface with MetaMask integration
- **index.js**: Frontend JavaScript logic for wallet connection and interaction

## Features

- 🔗 MetaMask wallet connection
- 🎨 Modern, responsive UI design
- 🌐 Multi-chain network switching
- 📊 Account information display
- ⚡ Real-time status updates

## Getting Started

### Running the Frontend

1. Open `index.html` in a web browser
2. Ensure MetaMask is installed and unlocked
3. Click "Connect MetaMask Wallet" to connect
4. Your account address will be displayed

### Using the Interface

The frontend provides:

- **Wallet Connection**: Connect your MetaMask wallet
- **Account Display**: View your connected account address
- **Status Information**: Real-time connection status
- **Network Support**: Switch between supported networks

## Browser Requirements

- Modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- MetaMask extension installed
- JavaScript enabled

## API Reference

### KairosFrontend Object

The frontend exposes a global `KairosFrontend` object with the following methods:

#### `initializeApp()`
Initializes the frontend application and checks for MetaMask.

```javascript
const success = KairosFrontend.initializeApp();
```

#### `connectWallet()`
Connects to the user's MetaMask wallet.

```javascript
const result = await KairosFrontend.connectWallet();
// Returns: { success: true, account: '0x...', accounts: [...] }
```

#### `disconnectWallet()`
Disconnects the wallet from the UI.

```javascript
const result = KairosFrontend.disconnectWallet();
// Returns: { success: true, message: '...' }
```

#### `getCurrentAccount()`
Gets the currently connected account.

```javascript
const account = await KairosFrontend.getCurrentAccount();
// Returns: '0x...' or null
```

#### `switchNetwork(chainId)`
Switches to a different blockchain network.

```javascript
const result = await KairosFrontend.switchNetwork(1); // Ethereum mainnet
// Returns: { success: true } or { success: false, error: '...' }
```

## Customization

### Styling

The interface uses inline CSS for simplicity. To customize:

1. Modify the `<style>` section in `index.html`
2. Change colors, fonts, or layout as needed
3. The gradient background uses: `#667eea` to `#764ba2`

### Functionality

To add new features:

1. Add new functions to `index.js`
2. Export them in the module.exports and window.KairosFrontend
3. Call them from HTML or other JavaScript files

## Integration with Backend

The frontend can integrate with the blockchain module:

```javascript
// Import blockchain functions
const { verifyTransaction } = require('../blockchain/index.js');

// Use in frontend logic
async function checkTransaction(txHash) {
  const result = await verifyTransaction(txHash);
  displayResult(result);
}
```

## Future Enhancements

- [ ] Transaction history viewer
- [ ] Smart account creation UI
- [ ] Batch transaction interface
- [ ] Multi-signature wallet support
- [ ] Real-time blockchain event monitoring
- [ ] Mobile-responsive improvements
