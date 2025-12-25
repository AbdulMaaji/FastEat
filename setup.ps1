# FastEat - PowerShell Setup Script
# This script checks for Node.js and installs dependencies

Write-Host "`n======================================"
Write-Host "  FastEat - Auto Setup"
Write-Host "======================================`n"

# Check if node is installed
$nodeExists = try { node --version 2>$null; $? } catch { $false }

if (-not $nodeExists) {
    Write-Host "[ERROR] Node.js is not installed!" -ForegroundColor Red
    Write-Host "`nPlease download and install Node.js from:"
    Write-Host "  https://nodejs.org (LTS version recommended)`n"
    Write-Host "After installation:`n  1. Close and reopen PowerShell`n  2. Run this script again`n"
    Read-Host "Press Enter to exit"
    exit 1
}

# Show node version
Write-Host "[OK] Node.js found!" -ForegroundColor Green
node --version

# Check npm
$npmExists = try { npm --version 2>$null; $? } catch { $false }

if (-not $npmExists) {
    Write-Host "[ERROR] npm is not installed!" -ForegroundColor Red
    Write-Host "Please reinstall Node.js`n"
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[OK] npm found!" -ForegroundColor Green
npm --version

# Check if in correct directory
if (-not (Test-Path "package.json")) {
    Write-Host "[ERROR] package.json not found!" -ForegroundColor Red
    Write-Host "Make sure you're in the FastEat directory`n"
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`n[INFO] Installing dependencies..." -ForegroundColor Cyan
Write-Host "This may take 2-3 minutes...`n"

npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[ERROR] npm install failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`n======================================"
Write-Host "  Installation Complete!" -ForegroundColor Green
Write-Host "======================================`n"

Write-Host "To start the development server, run:"
Write-Host "  npm start`n"
Write-Host "The app will open at: http://localhost:3000`n"

Read-Host "Press Enter to exit"
