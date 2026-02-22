@echo off
cd /d %~dp0
cd ..
if not exist cosmic_blockchain.exe (
    echo Error: cosmic_blockchain.exe not found!
    pause
    exit /b 1
)
cosmic_blockchain.exe
pause
