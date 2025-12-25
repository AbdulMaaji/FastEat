@echo off
REM FastEat Node.js Installation Script
REM Run this as Administrator

title FastEat - Node.js Installation
color 0A

echo.
echo ================================
echo FastEat - Node.js Installation
echo ================================
echo.

REM Check if running as Administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: This script must run as Administrator
    echo Please right-click this file and select "Run as administrator"
    echo.
    pause
    exit /b
)

echo OK Running as Administrator
echo.

REM Download Node.js
echo Step 1: Downloading Node.js v20.10.0...
set NodeURL=https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi
set InstallerPath=%TEMP%\node-installer.msi

powershell -Command "(New-Object System.Net.ServicePointManager).SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri '%NodeURL%' -OutFile '%InstallerPath%' -UseBasicParsing" 

if %errorLevel% neq 0 (
    echo ERROR: Failed to download Node.js
    pause
    exit /b
)

echo OK Download complete
echo.

REM Install Node.js
echo Step 2: Installing Node.js...
start /wait msiexec /i "%InstallerPath%" /quiet /qn
if %errorLevel% neq 0 (
    echo ERROR: Failed to install Node.js
    pause
    exit /b
)

echo OK Installation complete
echo.

REM Verify installation
echo Step 3: Verifying installation...
echo.

set NodePath=C:\Program Files\nodejs\node.exe
if exist "%NodePath%" (
    echo OK Found Node.js at: %NodePath%
    "%NodePath%" --version > NUL
    if %errorLevel% equ 0 (
        echo OK Node.js is working
    )
) else (
    echo ERROR: Node.js not found at expected location
    pause
    exit /b
)

echo.
echo ================================
echo OK Installation Successful!
echo ================================
echo.
echo Next steps:
echo 1. Close this window
echo 2. Open a new Command Prompt or PowerShell
echo 3. Navigate to your FastEat folder
echo 4. Run: npm install
echo 5. Run: npm start
echo.

pause
