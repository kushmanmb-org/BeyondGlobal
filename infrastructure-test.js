/**
 * Comprehensive Test Suite for BeyondGlobal Infrastructure
 * Tests all components: Bridge, ZK Verification, Validators, Kairos Bot
 */

const BeyondGlobalInfrastructure = require('./infrastructure');
const { BitcoinEthereumBridge, FeeOptimizer } = require('./bitcoin-ethereum-bridge');
const { ZKProofVerifier, ZKPDFVerifier } = require('./zk-verification');
const { ValidatorNetwork } = require('./validator-network');
const { KairosBot } = require('./kairos-bot');

console.log('Running BeyondGlobal Infrastructure Test Suite...\n');

let testsPassed = 0;
let testsFailed = 0;

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

// ============================================================================
// Bitcoin-Ethereum Bridge Tests
// ============================================================================
console.log('=== Bitcoin-Ethereum Bridge Tests ===\n');

test('Bridge: Should create bridge instance', () => {
  const bridge = new BitcoinEthereumBridge();
  if (!bridge) throw new Error('Bridge not created');
  if (!bridge.feeOptimizer) throw new Error('Fee optimizer not initialized');
});

test('Bridge: Should optimize Bitcoin fees', () => {
  const optimizer = new FeeOptimizer();
  const lowFee = optimizer.calculateBitcoinFee('low');
  const mediumFee = optimizer.calculateBitcoinFee('medium');
  const highFee = optimizer.calculateBitcoinFee('high');
  
  if (!mediumFee.satoshisPerByte) throw new Error('Fee not calculated');
  // Verify fee ordering: low < medium < high
  if (lowFee.satoshisPerByte >= mediumFee.satoshisPerByte) throw new Error('Fee ordering incorrect');
  if (mediumFee.satoshisPerByte >= highFee.satoshisPerByte) throw new Error('Fee ordering incorrect');
});

test('Bridge: Should optimize Ethereum gas', () => {
  const optimizer = new FeeOptimizer();
  const lowGas = optimizer.calculateEthereumGas('low');
  const mediumGas = optimizer.calculateEthereumGas('medium');
  const highGas = optimizer.calculateEthereumGas('high');
  
  if (!highGas.gasPrice) throw new Error('Gas not calculated');
  // Verify gas ordering: low < medium < high
  if (lowGas.gasPrice >= mediumGas.gasPrice) throw new Error('Gas ordering incorrect');
  if (mediumGas.gasPrice >= highGas.gasPrice) throw new Error('Gas ordering incorrect');
});

test('Bridge: Should create BTC to ETH transaction', () => {
  const bridge = new BitcoinEthereumBridge();
  const result = bridge.bridgeBitcoinToEthereum(
    { txid: 'test-btc-tx' },
    '0xEthAddress',
    { priority: 'high' }
  );
  if (!result.transactionId) throw new Error('Transaction ID not created');
  if (!result.hash) throw new Error('Transaction hash not created');
  if (result.status !== 'queued') throw new Error('Incorrect status');
});

test('Bridge: Should create ETH to BTC transaction', () => {
  const bridge = new BitcoinEthereumBridge();
  const result = bridge.bridgeEthereumToBitcoin(
    { hash: '0xtest-eth-tx' },
    'btc-address-123',
    { priority: 'low' }
  );
  if (!result.transactionId) throw new Error('Transaction ID not created');
  if (!result.hash) throw new Error('Transaction hash not created');
});

test('Bridge: Should get transaction status', () => {
  const bridge = new BitcoinEthereumBridge();
  const tx = bridge.bridgeBitcoinToEthereum(
    { txid: 'test' },
    '0xAddr',
    {}
  );
  const status = bridge.getTransactionStatus(tx.transactionId);
  if (!status) throw new Error('Status not found');
  if (status.id !== tx.transactionId) throw new Error('Wrong transaction');
});

test('Bridge: Should get statistics', () => {
  const bridge = new BitcoinEthereumBridge();
  bridge.bridgeBitcoinToEthereum({ txid: 'test1' }, '0xAddr1', {});
  bridge.bridgeBitcoinToEthereum({ txid: 'test2' }, '0xAddr2', {});
  const stats = bridge.getStatistics();
  if (stats.totalTransactions !== 2) throw new Error('Incorrect transaction count');
});

console.log();

// ============================================================================
// Zero-Knowledge Proof Tests
// ============================================================================
console.log('=== Zero-Knowledge Proof Tests ===\n');

test('ZK: Should create ZK verifier instance', () => {
  const verifier = new ZKProofVerifier();
  if (!verifier) throw new Error('Verifier not created');
});

test('ZK: Should generate proof', () => {
  const verifier = new ZKProofVerifier();
  const proof = verifier.generateProof(
    { type: 'test', timestamp: Date.now() },
    'secret-witness'
  );
  if (!proof.id) throw new Error('Proof ID not created');
  if (!proof.commitment) throw new Error('Commitment not created');
  if (!proof.piA || !proof.piB || !proof.piC) throw new Error('Proof points missing');
});

test('ZK: Should verify valid proof', () => {
  const verifier = new ZKProofVerifier();
  const proof = verifier.generateProof(
    { type: 'test', timestamp: Date.now() },
    'secret'
  );
  const result = verifier.verifyProof(proof);
  if (!result.valid) throw new Error('Valid proof marked as invalid');
});

test('ZK: Should reject invalid proof structure', () => {
  const verifier = new ZKProofVerifier();
  const result = verifier.verifyProof({ id: 'fake' });
  if (result.valid) throw new Error('Invalid proof marked as valid');
});

test('ZK: Should batch verify proofs', () => {
  const verifier = new ZKProofVerifier();
  const proof1 = verifier.generateProof({ type: 'test1', timestamp: Date.now() }, 'secret1');
  const proof2 = verifier.generateProof({ type: 'test2', timestamp: Date.now() }, 'secret2');
  const results = verifier.batchVerify([proof1, proof2]);
  if (results.total !== 2) throw new Error('Incorrect batch count');
  if (results.valid !== 2) throw new Error('Not all proofs verified');
});

test('ZK: Should get statistics', () => {
  const verifier = new ZKProofVerifier();
  verifier.generateProof({ type: 'test', timestamp: Date.now() }, 'secret');
  const stats = verifier.getStatistics();
  if (stats.totalProofsGenerated === 0) throw new Error('No proofs counted');
});

test('ZK-PDF: Should create PDF verifier', () => {
  const pdfVerifier = new ZKPDFVerifier();
  if (!pdfVerifier) throw new Error('PDF verifier not created');
});

test('ZK-PDF: Should generate PDF proof', () => {
  const pdfVerifier = new ZKPDFVerifier();
  const result = pdfVerifier.generatePDFProof(
    'pdf-hash-123',
    { pages: 5, size: 1024 }
  );
  if (!result.proofId) throw new Error('Proof ID not created');
  if (!result.documentHash) throw new Error('Document hash missing');
});

console.log();

// ============================================================================
// Validator Network Tests
// ============================================================================
console.log('=== Validator Network Tests ===\n');

test('Validator: Should create validator network', () => {
  const network = new ValidatorNetwork();
  if (!network) throw new Error('Network not created');
  if (network.blockHeight !== 0) throw new Error('Incorrect initial block height');
});

test('Validator: Should register validator', () => {
  const network = new ValidatorNetwork();
  const validatorId = network.registerValidator('32');
  if (!validatorId) throw new Error('Validator ID not created');
  const stats = network.getNetworkStats();
  if (stats.totalValidators !== 1) throw new Error('Validator not counted');
});

test('Validator: Should validate block with consensus', () => {
  const network = new ValidatorNetwork();
  // Register 3 validators for consensus
  network.registerValidator('32');
  network.registerValidator('32');
  network.registerValidator('32');
  
  const block = {
    previousHash: '0',
    timestamp: Date.now(),
    transactions: [
      { from: '0xA', to: '0xB', value: '1', signature: 'sig1' }
    ],
    nonce: 123
  };
  
  const result = network.submitBlock(block);
  if (!result.consensusReached) throw new Error('Consensus not reached');
  if (result.blockHeight !== 1) throw new Error('Block height not incremented');
});

test('Validator: Should require minimum validators', () => {
  const network = new ValidatorNetwork();
  network.registerValidator('32'); // Only 1 validator, less than minValidators (3)
  
  const block = {
    previousHash: '0',
    timestamp: Date.now(),
    transactions: [{ from: '0xA', to: '0xB', value: '1', signature: 'sig1' }],
    nonce: 123
  };
  
  // Should throw error for insufficient validators
  try {
    network.submitBlock(block);
    throw new Error('Should have thrown error for insufficient validators');
  } catch (error) {
    if (!error.message.includes('Insufficient active validators')) {
      throw error;
    }
  }
});

test('Validator: Should get network statistics', () => {
  const network = new ValidatorNetwork();
  network.registerValidator('32');
  network.registerValidator('32');
  const stats = network.getNetworkStats();
  if (stats.totalValidators !== 2) throw new Error('Incorrect validator count');
  if (!stats.consensusAlgorithm) throw new Error('Consensus algorithm not set');
});

test('Validator: Should get validator info', () => {
  const network = new ValidatorNetwork();
  const validatorId = network.registerValidator('32');
  const info = network.getValidator(validatorId);
  if (!info) throw new Error('Validator info not found');
  if (info.id !== validatorId) throw new Error('Wrong validator ID');
  if (info.stake !== '32') throw new Error('Incorrect stake amount');
});

console.log();

// ============================================================================
// Kairos Bot Tests
// ============================================================================
console.log('=== Kairos Bot Tests ===\n');

test('Kairos: Should create bot instance', () => {
  const bot = new KairosBot();
  if (!bot) throw new Error('Bot not created');
  if (bot.running) throw new Error('Bot should not be running initially');
});

test('Kairos: Should start monitoring', () => {
  const bot = new KairosBot();
  const status = bot.start();
  if (status.status !== 'started') throw new Error('Bot not started');
  if (!bot.running) throw new Error('Bot not running');
  bot.stop();
});

test('Kairos: Should stop monitoring', () => {
  const bot = new KairosBot();
  bot.start();
  const status = bot.stop();
  if (status.status !== 'stopped') throw new Error('Bot not stopped');
  if (bot.running) throw new Error('Bot still running');
});

test('Kairos: Should connect to components', () => {
  const bot = new KairosBot();
  const bridge = new BitcoinEthereumBridge();
  bot.connect({ bridge });
  if (!bot.bridge) throw new Error('Bridge not connected');
});

test('Kairos: Should collect metrics', () => {
  const bot = new KairosBot();
  const bridge = new BitcoinEthereumBridge();
  const network = new ValidatorNetwork();
  const zkVerifier = new ZKProofVerifier();
  
  bot.connect({ bridge, validatorNetwork: network, zkVerifier });
  const snapshot = bot.monitorInfrastructure();
  
  if (!snapshot.timestamp) throw new Error('Timestamp missing');
  if (!snapshot.bridge) throw new Error('Bridge metrics missing');
  if (!snapshot.validators) throw new Error('Validator metrics missing');
  if (!snapshot.zkProofs) throw new Error('ZK proof metrics missing');
});

test('Kairos: Should generate report', () => {
  const bot = new KairosBot();
  bot.connect({ bridge: new BitcoinEthereumBridge() });
  const report = bot.generateReport();
  if (!report.id) throw new Error('Report ID missing');
  if (!report.timestamp) throw new Error('Timestamp missing');
  if (!report.components) throw new Error('Components missing');
});

test('Kairos: Should get status', () => {
  const bot = new KairosBot();
  const status = bot.getStatus();
  if (typeof status.running !== 'boolean') throw new Error('Running status missing');
  if (!status.connectedComponents) throw new Error('Connected components missing');
});

console.log();

// ============================================================================
// Integration Tests
// ============================================================================
console.log('=== Integration Tests ===\n');

test('Integration: Should create full infrastructure', () => {
  const infrastructure = new BeyondGlobalInfrastructure();
  if (!infrastructure) throw new Error('Infrastructure not created');
  if (!infrastructure.bridge) throw new Error('Bridge not initialized');
  if (!infrastructure.zkVerifier) throw new Error('ZK verifier not initialized');
  if (!infrastructure.validatorNetwork) throw new Error('Validator network not initialized');
  if (!infrastructure.kairosBot) throw new Error('Kairos bot not initialized');
});

test('Integration: Should process BTC to ETH transaction', () => {
  const infrastructure = new BeyondGlobalInfrastructure();
  const result = infrastructure.processBitcoinToEthereum(
    { txid: 'test-btc' },
    '0xEthAddr',
    { priority: 'medium' }
  );
  if (!result.bridgeTransaction) throw new Error('Bridge transaction missing');
  if (!result.zkProof) throw new Error('ZK proof missing');
  if (!result.zkProof.verified) throw new Error('ZK proof not verified');
});

test('Integration: Should process ETH to BTC transaction', () => {
  const infrastructure = new BeyondGlobalInfrastructure();
  const result = infrastructure.processEthereumToBitcoin(
    { hash: '0xtest-eth' },
    'btc-addr',
    { priority: 'high' }
  );
  if (!result.bridgeTransaction) throw new Error('Bridge transaction missing');
  if (!result.zkProof) throw new Error('ZK proof missing');
});

test('Integration: Should validate blocks', () => {
  const infrastructure = new BeyondGlobalInfrastructure();
  // Register validators first
  infrastructure.validatorNetwork.registerValidator('32');
  infrastructure.validatorNetwork.registerValidator('32');
  infrastructure.validatorNetwork.registerValidator('32');
  
  const result = infrastructure.validateBlock({
    previousHash: '0',
    timestamp: Date.now(),
    transactions: [{ from: '0xA', to: '0xB', value: '1', signature: 'sig' }],
    nonce: 999
  });
  
  if (!result.consensusReached) throw new Error('Block validation failed');
});

test('Integration: Should verify PDF documents', () => {
  const infrastructure = new BeyondGlobalInfrastructure();
  const result = infrastructure.verifyPDF('pdf-hash', { pages: 10, size: 2048 });
  if (!result.proofId) throw new Error('Proof ID missing');
  if (result.status !== 'verified') throw new Error('PDF not verified');
});

test('Integration: Should get system status', () => {
  const infrastructure = new BeyondGlobalInfrastructure();
  const status = infrastructure.getSystemStatus();
  if (!status.components) throw new Error('Components missing');
  if (!status.components.bridge) throw new Error('Bridge status missing');
  if (!status.components.zkVerifier) throw new Error('ZK verifier status missing');
  if (!status.components.validatorNetwork) throw new Error('Validator status missing');
  if (!status.components.kairosBot) throw new Error('Kairos bot status missing');
});

console.log();

// ============================================================================
// Test Summary
// ============================================================================
console.log('='.repeat(60));
console.log('Test Summary');
console.log('='.repeat(60));
console.log(`Total Tests: ${testsPassed + testsFailed}`);
console.log(`Passed: ${testsPassed} ✓`);
console.log(`Failed: ${testsFailed} ✗`);
console.log('='.repeat(60));

if (testsFailed > 0) {
  process.exit(1);
}

console.log('\n✓ All tests passed!');
