#!/bin/bash
cd "$(dirname "$0")"
cd ..
if [ ! -f "./cosmic_blockchain" ]; then
    echo "Error: cosmic_blockchain executable not found!"
    exit 1
fi
if [ ! -x "./cosmic_blockchain" ]; then
    echo "Error: cosmic_blockchain is not executable!"
    exit 1
fi
./cosmic_blockchain
