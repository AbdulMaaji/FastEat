@echo off
REM FastEat Auto-Setup Script
REM This script will check if Node.js is installed and install dependencies

echo.
echo ======================================
echo   FastEat - Auto Setup
echo ======================================
echo.

REM Check if node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please download and install Node.js from:
    echo   https://nodejs.org (LTS version recommended)
    echo.
    echo After installation:
    echo   1. Close and reopen this Command Prompt
    echo   2. Run this script again
    echo.
    pause
    exit /b 1
)

REM Check npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed!
    echo Please reinstall Node.js
    pause
    exit /b 1
)

REM Show versions
echo [OK] Node.js found!
node --version
echo [OK] npm found!
npm --version
echo.

REM Check if package.json exists
if not exist "package.json" (
    echo [ERROR] package.json not found!
    echo Make sure you're in the FastEat directory
    pause
    exit /b 1
)

echo [INFO] Installing dependencies...
echo This may take 2-3 minutes...
echo.
npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm install failed!
    pause
    exit /b 1
)

echo.
echo ======================================
echo   Installation Complete!
echo ======================================
echo.
echo To start the development server, run:
echo   npm start
echo.
echo The app will open at: http://localhost:3000
echo.
pause
